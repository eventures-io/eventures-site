'use strict';

angular.module('evtrs-notes').directive('notesMenu', function ($rootScope, NotesResource, $state, $timeout, $cookies) {
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

            $scope.goHome = function () {
                $scope.closeMenu();
                $timeout(function () {
                    $rootScope.$broadcast('SHOW_MENU_BTN');
                    $state.go('work.home');
                }, 700);
            };

            $scope.removeBookmark = function (bookmark) {
                var bookmarks = $cookies.getObject('bookmarks');
                _.remove(bookmarks, function (bm) {
                    return bm.url === bookmark.url;
                });
                $cookies.putObject('bookmarks', bookmarks);
                loadBookmarks();
            };


            menuIcon.onclick = function () {
                menuElement.classList.add('open');
            };


            $scope.closeMenu = function () {
                menuElement.classList.remove('open');
                menuElement.style.backgroundImage = '';
            };

            $scope.showPost = function (post) {
                menuElement.addEventListener('transitionend', function showPost() {
                    $state.go('notes.post', {postId: post.ID, postTitle: post.titleUrl});
                    setActivePost(post);
                    menuElement.removeEventListener('transitionend', showPost);
                });
                $scope.closeMenu();
            };

            var setActivePost = function (post) {
                var elements = menuElement.querySelectorAll('li');
                _(elements).forEach(function (el) {
                    var mask = el.querySelector('.bg-mask');
                    mask.classList.remove('active');
                    if (el.innerText === post.title) {
                        mask.classList.add('active');
                    }
                }).value();

            }


            $scope.$on('BOOKMARKED', function () {
                loadBookmarks();
            });

            function handleLoadError() {
                $rootScope.$broadcast('SHOW_MENU_BTN');
                menuIcon.style.display = 'none';
                document.querySelector('.notes-spinner').style.display = 'none';
                document.querySelector('.notes-load-error').style.visibility = 'visible';
            }

            var init = function () {
                NotesResource.getPosts().then(function (posts) {
                    if (posts.length > 0) {
                        $scope.posts = posts;
                    } else {
                        handleLoadError();
                    }

                }, function (error) {
                    handleLoadError();

                });
                loadBookmarks();
            };
            init();
        }
    }


});