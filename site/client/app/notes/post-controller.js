'use strict';

angular.module('evtrs-notes')
    .controller('PostController', function ($scope, $stateParams, BlogResource) {

        BlogResource.getPost($stateParams.postId).then(function (response) {
            $scope.post = response;
            $scope.contentLoaded = true;
            window.document.title = $scope.post.title;
            $scope.post.url = window.location.href;
        });

    });