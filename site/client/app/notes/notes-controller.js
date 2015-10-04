'use strict';

angular.module('evtrs-notes', [])
    .controller('NotesController', function ($scope, $rootScope, $state, $stateParams, BlogResource) {

        $rootScope.$broadcast('HIDE_MENU_BTN');
        if (!$stateParams.postId) {
            BlogResource.getPosts().then(function (response) {
                var post = response[0];
                $state.go('notes.post', {postId: post.ID, postTitle: post.titleUrl});
            });
        }

    });