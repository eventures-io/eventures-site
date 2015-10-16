'use strict'

angular.module('evtrs-site')
    .directive('preloader', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var to;
                var timedOut = false;
                var loaded = false;

                var loaderSvg = element[0].querySelector('.loader-svg');
                var loaderPeriod = element[0].querySelector('.loader-period');

                var broadCast = function () {
                    setTimeout(function () {
                        var throttle = function () {
                            $rootScope.$broadcast('APP_LOADED');
                        }
                        return throttle();
                    }, 400);
                }

                if (loaderSvg) {
                    loaderSvg.addEventListener('animationend', function (event) {
                        onAnimationEnd();
                    }, true);
                    loaderSvg.addEventListener('webkitAnimationEnd', function (event) {
                        onAnimationEnd();
                    }, true);
                }

                var onAnimationEnd = function() {
                    timedOut = true;
                    if (loaded) {
                        loaderPeriod.style.opacity = '1';
                        broadCast();
                    }
                }

                var listener = scope.$watch(function () {
                    clearTimeout(to);
                    to = setTimeout(function () {
                        //console.log('initialised');
                        listener();
                        loaded = true;
                        if (timedOut) {
                            loaderPeriod.style.opacity = '1';
                            broadCast();
                        }

                    }, 50);
                });
            },
            controller: function ($scope, $element) {

                $scope.$on('APP_LOADED', function () {
                    var loader = $element[0].querySelector('.loader');
                    //loader.style.display='none';
                    //console.log('app loaded');
                    runLoadTransition();
                });

                var runLoadTransition = function () {
                    var main = $element[0].querySelector('.animate-main');
                    var loadingPane = $element[0].querySelector('.loading-pane');
                    loadingPane.style.zIndex = '0';
                    main.style.position = 'absolute';
                    main.style.zIndex = '2';

                    //TODO hide menu button

                    TweenLite.fromTo(main, 0.7, {css: {
                        top: '100vh'
                    }}, {css: {
                        top: '0'
                    },
                        ease: Expo.easeOut,
                        onComplete: function () {
                            main.style.position = 'initial';
                            loadingPane.style.display = 'none';
                            main.style.zIndex = '0';
                            //TODO show menu button
                        }
                    });
                }
            }
        };
    }]);