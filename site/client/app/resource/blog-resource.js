'use strict';

angular.module('evtrs-site').factory('BlogResource', function ($http, conf, $log, $q) {
    var baseUrl = conf.WP_URL.concat('/posts');

    var postsPreviewUrl = baseUrl.concat('?fields=ID,title,featured_image');

    var getPostList = function () {
        var deferred = $q.defer();

        $http.get(postsPreviewUrl).then(function(response){
            var posts = response.data;
            _(posts).forEach(function(post) {
               var title = post.title;
               post.titleUrl = title.replace(/ /g,"-");
            }).value();
            deferred.resolve(posts);
        });

        return deferred.promise;
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






