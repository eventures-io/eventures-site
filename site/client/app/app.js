'use strict';
/**
 *
 */
angular
    .module('evtrs-site', [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'evtrs-config',
        'evtrs-notes',
        'angularUtils.directives.dirDisqus',
        'ngCookies',
        '720kb.socialshare'
        //'ngTouch'
    ]).config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.interceptors.push('HttpRequestInterceptor');
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise('/');
        if (Modernizr.cssvwunit) {
            $stateProvider
                .state('home', {
                    url: '/',
                    redirectTo: 'work.home'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'app/contact/contact.html',
                    data: {
                        title: 'Eventures: Contact'
                    }
                })
                .state('notes', {
                    url: '/notes',
                    templateUrl: 'app/notes/notes.html',
                    controller: 'NotesController',
                    data: {title: 'Notes'}
                }).state('notes.post', {
                    url: '/:postId/:postTitle',
                    views: {
                        post: {
                            templateUrl: 'app/notes/post.html',
                            controller: 'PostController'
                        }
                    }
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
        } else {
            $stateProvider
                .state('browsehappy', {
                    url: '/',
                    templateUrl: 'app/home/browsehappy.html',
                    controller: function($rootScope) {
                        $rootScope.$broadcast('HIDE_MENU_BTN');
                    }
                })
        }
    }).
    run(function ($http, PROJECT_CONSTANTS, $rootScope, $state, $window, $location) {

        $rootScope.$on('$stateChangeStart', function (event, to, params) {
            if (to.redirectTo) {
                event.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, current) {
            if (current.data) {
                $window.document.title = current.data.title;
            }
        });

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(function () {
            return $location.path()
        }, function (newLocation, oldLocation) {
            if ($rootScope.actualLocation === newLocation) {
                if ($rootScope.actualLocation === newLocation) {
                    window.location.href = newLocation;
                }
            }
        });

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

