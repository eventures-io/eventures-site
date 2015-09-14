'use strict'

angular.module('evtrs-site')
    .directive('init', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope) {
                var to;
                var timedOut = false;
                var loaded =  false;

                //TODO Listen to animation end instead
                setTimeout(function(){
                        var throttle =  function() {
                            console.log('timed out');
                            timedOut = true;
                            if(loaded) {
                                $rootScope.$broadcast('APP_LOADED');
                            }
                        }
                   return throttle();
                }, 1000);

                var listener = $scope.$watch(function () {
                    clearTimeout(to);
                    to = setTimeout(function () {
                        console.log('initialised');
                        listener();
                        loaded = true;
                        if(timedOut){
                            $rootScope.$broadcast('APP_LOADED');
                        }

                    }, 50);
                });
            },
            controller: function($scope, $element) {

                $scope.$on('APP_LOADED', function() {
                    console.log('app loaded');
                    runLoadTransition();
                });

                var runLoadTransition = function(){
                    var main = $element[0].querySelector('.animate-main');
                    var loadingPane = $element[0].querySelector('.loading-pane');
                    loadingPane.style.zIndex = '0';
                    main.style.position= 'absolute';
                    main.style.zIndex = '2';

                    TweenLite.fromTo(main, 1.7, {css: {
                        top: '100vh'
                    }}, {css: {
                        top: '0'
                    },
                        ease: Expo.easeOut,
                        onComplete: function() {
                            main.style.position= 'initial';
                            loadingPane.style.display = 'none';
                            main.style.zIndex = '0';

                        }
                    });

                }
            }
        };
    }]);