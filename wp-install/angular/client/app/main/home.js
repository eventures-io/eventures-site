'use strict';

angular.module('bfSite')
    .controller('HomeController', function ($scope, BlogResource, $state) {

        BlogResource.getPosts().then(function(response){
            var post = response.data[0];
            $state.go('post', {postId: post.ID, postTitle: post.title})
        });

    });

