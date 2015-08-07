'use strict';

angular.module('bfSite').factory('BlogResource', function ($http, conf, $log) {
    var baseUrl = conf.WP_URL.concat('/posts');

    var postsPreviewUrl = baseUrl.concat('?fields=ID,title,featured_image');

    var getPostList = function () {
        return  $http.get(postsPreviewUrl);
    }

    var getPost = function (postId) {
        return $http.get(baseUrl.concat('/').concat(postId));
    }

    var preloadImages = function (posts) {
        var images = [];
        _(posts).forEach(function(post) {
            try {
                var fi = post.featured_image;
                var img = new Image();
                img.src = fi.source;
                images.push({'ID' : post.ID, 'image' : img});
            } catch(error) {
                $log.error(JSON.stringify(error));
            }
        }).value();

      return images;
    }


    return {
        getPosts: getPostList,
        preloadImages: preloadImages,
        getPost: getPost
    }
});






