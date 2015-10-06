'use strict';

angular.module('evtrs-notes', [])
    .controller('NotesController', function ($scope, $rootScope, $state, NotesResource) {

        $rootScope.$broadcast('HIDE_MENU_BTN');
        if (!$state.params.postId) {
            NotesResource.getPosts().then(function (response) {
                var post = response[0];
                $state.go('notes.post', {postId: post.ID, postTitle: post.titleUrl});
            }), function(error){
                alert('controller!!');
            };
        }
    });