'use strict'

angular.module('evtrs-site')
    .directive('init', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope) {
                var to;
                var timedOut = false;
                var loaded =  false;

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
                    var loadingPane = $element[0].querySelector('.loading-pane');
                    TweenLite.to(loadingPane, 1, {css: {
                        top: '-120vh'
                    },
                        ease: Power0.easeIn
                        //onComplete: repositionImage,
                    });

                }
            }
        };
    }]);