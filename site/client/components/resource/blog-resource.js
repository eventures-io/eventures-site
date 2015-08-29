'use strict';

angular.module('evtrs-site').factory('BlogResource', function ($http, conf, $log, $q, $location) {
    var baseUrl = conf.WP_URL.concat('/posts');

    var postsPreviewUrl = baseUrl.concat('?fields=ID,title,featured_image');
    var currentPost = {};

    var getPostList = function () {
        var deferred = $q.defer();

        $http.get(postsPreviewUrl).then(function(response){
            var posts = response.data;
            _(posts).forEach(function(post) {
               var title = post.title;
               post.titleUrl = title.replace(/ /g,'-');

            }).value();
            deferred.resolve(posts);
        });

        return deferred.promise;
    };

    var getPost = function (postId) {
        var deferred = $q.defer();

        $http.get(baseUrl.concat('/').concat(postId)).then(function(response){
            var post = response.data;
            post.publDate = new Date(post.date);
            post.shortUrl = 'http//wwww.' + $location.host() + '/blog/' + post.ID;
            currentPost = post;
            deferred.resolve(post);
        });

        return deferred.promise;
    };

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
    };

    var getCurrentPost = function() {
        return currentPost;
    };

    var incrementLikes = function(postId) {

        $http.get('/api/wp/getLikes').then(function(response){

        })
    };

    var getLikes =  function(postId){
        $http.get('/api/wp/getLikes').then(function(response){

        })
    };


    return {
        getPosts: getPostList,
        preloadImages: preloadImages,
        getPost: getPost,
        getCurrentPost : getCurrentPost,
        incrementLikes: incrementLikes,
        getLikes: getLikes
    }
});





