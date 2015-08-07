'use strict';

angular.module('bfSite').directive('navbar', function(BlogResource, $state, $timeout) {
    return {
        restrict : 'E',
        templateUrl: 'components/navbar/navbar.html',
        controller: function($element, $scope){

            var menuElement = document.querySelector('.menu');

            BlogResource.getPosts().then(function(response){
                //TODO load only once
                $scope.posts = response.data;
                $scope.postImages = BlogResource.preloadImages(response.data);
            });

            $scope.openMenu = function() {
                menuElement.classList.add('menu-open');
            };

            $scope.closeMenu = function() {
                menuElement.classList.remove('menu-open');
                menuElement.style.backgroundImage='';
            };

            $scope.showPost = function(post){
                $scope.closeMenu();
                //TODO listen for animation end event
                $timeout(function(){
                    return   $state.go('post', {postId:post.ID, postTitle: post.title});
                }, 700);
            };



        }
    }


});