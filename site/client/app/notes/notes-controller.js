'use strict';

angular.module('evtrs-notes', [])
    .controller('NotesController', function ($scope, $rootScope, $state, NotesResource, $log, $timeout) {

        $rootScope.$broadcast('HIDE_MENU_BTN');
        var mainView = document.querySelector('.animate-main');

        var param = $state.params.postId;
        mainView.addEventListener('animationend', loadLatestPost);


        function loadLatestPost(event) {
            mainView.removeEventListener('animationend');
            if (!param) {
                    NotesResource.getPosts().then(function (posts) {
                        var post = posts[0];
                        if (post) {
                           $timeout(function(){
                            $state.go('notes.post', {postId: post.ID, postTitle: post.titleUrl});
                           }, 1000);
                        }
                    }), function (error) {
                        $log.error(error);
                    };
                }
        }

    });
