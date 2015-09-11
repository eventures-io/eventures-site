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
            .otherwise('/work');

        $stateProvider
            .state('home', {
                url: '/nowhere',
                templateUrl: '',
                controller: 'HomeController'
            }).state('blog', {
                url: '/blog',
                template: '',
                controller: 'PostController'
            }).state('post', {
                url: '/blog/:postId/:postTitle',
                templateUrl: 'app/post/post.html',
                controller: 'PostController'
            }).state('work', {
                url: '/work',
                templateUrl: 'app/work/work.html',
                controller: 'WorkController'
            }).state('work.project', {
                url: '/:project',
                views: {
                    project: {
                        templateUrl: function (stateParams) {
                            return 'app/work/projects/' + stateParams.project + '.html';
                        },
                        controller: 'WorkController'
                    }
                }
            })

    })
    .
    filter('HtmlFilter', ['$sce', function ($sce) {
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