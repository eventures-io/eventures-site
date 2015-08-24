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
               // $scope.postImages = BlogResource.preloadImages(posts);
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


        }
    }


});