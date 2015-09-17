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
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
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
                        }
                    }
                }
            }).state('work.project.site', {
                url: '/site',
                views: {
                    site: {
                        templateUrl: 'app/work/site-view.html'
                    }
                }
            })

    }).run(function ($http, PROJECT_CONSTANTS) {
        //Ping heroku apps to wake up the dynos
//        _.forIn(PROJECT_CONSTANTS, function(project, key) {
//            //console.log(key, project);
//            if(project.hasOwnProperty('siteUrl')){
//                $http.get(project.siteUrl);
//            }
//        });

    }).filter('HtmlFilter', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
    ]).filter('URLFilter', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
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