'use strict';

angular.module('evtrs-site')
    .controller('PostController', function ($scope, $stateParams,  BlogResource) {

        BlogResource.getPost($stateParams.postId).then(function(response){
            $scope.post = response;
            //TODO use repeat end
            $scope.contentLoaded = true;
            window.document.title = $scope.post.title;
            $scope.post.url = window.location.href;
        });
    });