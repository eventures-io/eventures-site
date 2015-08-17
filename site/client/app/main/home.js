'use strict';

angular.module('evtrs-site')
    .controller('HomeController', function ($scope, BlogResource, $state) {

        BlogResource.getPosts().then(function(response){
            var post = response[0];
            $state.go('post', {postId: post.ID, postTitle: post.titleUrl});
        });

    });
