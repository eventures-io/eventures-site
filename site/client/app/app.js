'use strict';

/**
 *
 */
angular
    .module('evtrs-site', [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'config',
        'angularUtils.directives.dirDisqus',
        'ngCookies',
        '720kb.socialshare'
        //'ngTouch'
    ]).config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.interceptors.push('HttpRequestInterceptor');
        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/work/work.html',
                controller: 'HomeController'
            }).state('blog', {
                url: '/blog/:postId/:postTitle',
                templateUrl: 'app/post/post.html',
                controller: 'PostController'
            });

    } )
    .filter('HtmlFilter', ['$sce', function ($sce) {
       return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

//TODO
//$stateProvider
//    .state('home', {
//        url: '/',
//        template: '',
//        controller: 'HomeController',
//        title: 'Home'
//    })
//
//.run(['$rootScope', function($rootScope) {
//    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//        window.document.title = current.$$route.title;
//    });
//}]);