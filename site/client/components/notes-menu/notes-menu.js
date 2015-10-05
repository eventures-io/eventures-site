'use strict';

angular.module('evtrs-notes').directive('notesMenu', function ($rootScope, BlogResource, $state, $timeout, $cookies) {
    return {
        restrict: 'E',
        templateUrl: 'components/notes-menu/notes-menu.html',
        controller: function ($element, $scope) {
            var menuIcon = $element[0].querySelector('.menu-icon');
            var menuElement = $element[0].querySelector('.notes-menu');

            var loadBookmarks = function () {
                var bookmarks = $cookies.getObject('bookmarks') || [];
                $scope.bookmarks = [];
                if (bookmarks.length > 0) {
                    $scope.bookmarks[0] = bookmarks[0];
                }
            };

            $scope.goHome = function() {
                $scope.closeMenu();
                $timeout(function () {
                    $rootScope.$broadcast('SHOW_MENU_BTN');
                    return $state.go('home');
                }, 700);
            };

            $scope.removeBookmark = function(bookmark) {
                var bookmarks = $cookies.getObject('bookmarks');
                _.remove(bookmarks, function(bm) {
                    return bm.url === bookmark.url;
                });
                $cookies.putObject('bookmarks', bookmarks);
                loadBookmarks();
            };


            var openMenu = function () {
                menuElement.classList.add('open');
            };


            $scope.closeMenu = function () {
                menuElement.classList.remove('open');
                menuElement.style.backgroundImage = '';
            };

            $scope.showPost = function (post) {
                menuElement.addEventListener('transitionend', function () {
                    $state.go('notes.post', {postId: post.ID, postTitle: post.titleUrl});
                    menuElement.removeEventListener('transitionend');
                    setActivePost(post);
                });
                $scope.closeMenu();
            };

            var setActivePost = function(post) {
                var elements = menuElement.querySelectorAll('li');
                _(elements).forEach(function(el){
                    var mask = el.querySelector('.bg-mask');
                    mask.classList.remove('active');
                    if(el.innerText === post.title){
                        mask.classList.add('active');
                    }
                }).value();

            }

            $scope.getBackgroundStyle = function (post) {
                if (post) {
                    return {
                        'background-image': 'url(' + post.featured_image.source + ')'
                    };
                }
                return null;
            };

            $scope.$on('BOOKMARKED', function(){
                loadBookmarks();
            });

            var init = function () {
                menuIcon.addEventListener("click", openMenu, false);
                BlogResource.getPosts().then(function (posts) {
                    //TODO load only once, move to service
                    $scope.posts = posts;
                });
                loadBookmarks();
            };
            init();

        }
    }


});