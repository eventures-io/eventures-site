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
            .otherwise('/work/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                data: {
                    title: 'Eventures'
                }

            }).state('blog', {
                url: '/blog',
                template: '',
                controller: 'PostController',
                data: {title: 'Notes'}
            }).state('post', {
                url: '/blog/:postId/:postTitle',
                templateUrl: 'app/post/post.html',
                controller: 'PostController'
            })
            .state('work', {
                url: '/work',
                templateUrl: 'app/work/work.html',
                controller: 'WorkController',
                data: {
                    title: 'Eventures: Work'
                }
            })
            .state('work.home', {
                url: '/home',
                views: {
                    home: {
                        templateUrl: 'app/home/home.html'
                    }
                },
                data: {
                    title: 'Eventures: Home'
                }
            })
            .state('work.project', {
                url: '/:project',
                views: {
                    project: {
                        templateUrl: function (stateParams) {
                            return 'app/work/projects/' + stateParams.project + '.html';
                        },
                        controller: 'ProjectController'
                    }
                }
            }).state('work.project.site', {
                url: '/site',
                views: {
                    site: {
                        templateUrl: 'app/work/site-view/site-view.html'
                    }
                }
            })
    }).
    run(function ($http, PROJECT_CONSTANTS, $rootScope) {
        //Ping heroku apps to wake up the dynos
//        _.forIn(PROJECT_CONSTANTS, function(project, key) {
//            //console.log(key, project);
//            if(project.hasOwnProperty('siteUrl')){
//                $http.get(project.siteUrl);
//            }
//        });

        $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
            if (current.data) {
                window.document.title = current.data.title;
            }


    });

}).
filter('HtmlFilter', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}
]).filter('URLFilter', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

