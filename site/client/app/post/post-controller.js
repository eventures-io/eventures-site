'use strict';

angular.module('evtrs-site')
    .controller('PostController', function ($scope, $state, $stateParams, BlogResource) {
        if (!$stateParams.postId) {
            BlogResource.getPosts().then(function (response) {
                var post = response[0];
                $state.go('post', {postId: post.ID, postTitle: post.titleUrl});
            });
        }
        else {
            BlogResource.getPost($stateParams.postId).then(function (response) {
                $scope.post = response;
                //TODO use repeat end
                $scope.contentLoaded = true;
                window.document.title = $scope.post.title;
                $scope.post.url = window.location.href;
            });
        }
    });