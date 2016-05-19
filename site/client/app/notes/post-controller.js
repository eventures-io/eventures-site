'use strict';

angular.module('evtrs-notes')
    .controller('PostController', function ($scope, $stateParams, NotesResource) {

        NotesResource.getPost($stateParams.postId).then(function (response) {
            $scope.post = response;
            $scope.contentLoaded = true;
            window.document.title = $scope.post.title;
            $scope.post.url = window.location.href;
        });

        $scope.getBackgroundStyle = function (post) {
            if (post) {
                return {
                    'background-image': 'url(' + post.featured_image.source + ')'
                };
            }
            return null;
        };

    });