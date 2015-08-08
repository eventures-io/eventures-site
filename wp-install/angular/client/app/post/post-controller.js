'use strict';

angular.module('evtrs-site')
    .controller('PostController', function ($scope, $stateParams,  BlogResource) {

        BlogResource.getPost($stateParams.postId).then(function(response){
            $scope.post = response.data;
        });

    });