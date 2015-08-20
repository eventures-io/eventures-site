'use strict';

angular.module('evtrs-site').directive('navbar', function (BlogResource, $state, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'components/navbar/navbar.html',
        controller: function ($element, $scope) {

            var menuElement = document.querySelector('.menu');

            BlogResource.getPosts().then(function (posts) {
                //TODO load only once, move to service
                $scope.posts = posts;
                //TODO preload images if not on mobile, move to service, not resource
                $scope.postImages = BlogResource.preloadImages(posts);
            });

            $scope.openMenu = function () {
                menuElement.classList.add('menu-open');
            };

            $scope.closeMenu = function () {
                menuElement.classList.remove('menu-open');
                menuElement.style.backgroundImage = '';
            };

            $scope.showPost = function (post) {
                $scope.closeMenu();
                //TODO listen for animation end event
                $timeout(function () {
                    return   $state.go('blog', {postId: post.ID, postTitle: post.titleUrl});
                }, 700);
            };

            $scope.getBackgroundStyle = function (post) {
                if(post){
                    return {'background-image': 'url(' + post.featured_image.source + ')'};
                }
                return null;
            };

            //TODO move social icons to separate directive
            $scope.bookmarkArticle = function (title) {
                var bookmarkURL = window.location.href;
                var bookmarkTitle = title;
                var triggerDefault = false;

                if (window.sidebar && window.sidebar.addPanel) {
                    // Firefox version < 23
                    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
                }
//                else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
//                    // Firefox version >= 23 and Opera Hotlist
//                    var $this = $(this);
//                    $this.attr('href', bookmarkURL);
//                    $this.attr('title', bookmarkTitle);
//                    $this.attr('rel', 'sidebar');
//                    //$this.off(e);
//                    triggerDefault = true;
//                }
                else if (window.external && ('AddFavorite' in window.external)) {
                    // IE Favorite
                    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                } else {
                    // WebKit - Safari/Chrome
                    var tooltipText = 'Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark.';
                    var tooltip = document.querySelector('span[data-hint="Bookmark"]');
                    tooltip.setAttribute('data-hint', tooltipText);
                }

                return triggerDefault;
            };


        }
    }


});