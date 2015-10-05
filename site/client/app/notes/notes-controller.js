'use strict';

angular.module('evtrs-notes', [])
    .controller('NotesController', function ($scope, $rootScope, $state, BlogResource) {

        $rootScope.$broadcast('HIDE_MENU_BTN');
        if (!$state.params.postId) {
            BlogResource.getPosts().then(function (response) {
                var post = response[0];
                $state.go('notes.post', {postId: post.ID, postTitle: post.titleUrl});
            });
        }
    });