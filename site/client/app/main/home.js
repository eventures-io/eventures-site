'use strict';

angular.module('evtrs-site')
    .controller('HomeController', function ($scope, BlogResource, $state) {

        $scope.active = false;

        $scope.setActive =  function() {
            $scope.active = true;
        }
        $scope.setInactive =  function() {
            $scope.active = false;
        }


//        BlogResource.getPosts().then(function(response){
//            var post = response[0];
//            $state.go('blog', {postId: post.ID, postTitle: post.titleUrl});
//        });

    });

