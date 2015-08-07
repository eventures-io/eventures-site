'use strict';

/**
 *
 */
angular
    .module('bfSite', [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        //'restangular',
        'config'
        //'ngTouch'
    ]).config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
       // RestangularProvider.setBaseUrl(CONF.wpUrl);

        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '',
                controller: 'HomeController'
            }).state('post', {
                url: '/post/:postId/:postTitle',
                templateUrl: 'app/post/post.html',
                controller: 'PostController'
            })

    } )
    .filter('HtmlFilter', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
