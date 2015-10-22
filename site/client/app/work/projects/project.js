'use strict';

angular.module('evtrs-site')
    .controller('ProjectController', function ($scope, $rootScope, $state, $timeout) {

        if (!$scope.activeProject) {
            //project is accessed from url.
//            $scope.$on('APP_LOADED', function () {
                $timeout(function () {
                    var broadcast = function () {
                        $rootScope.$broadcast('LOAD_PROJECT', {name: $state.params.project, next: false});
                    }
                    return broadcast();
                    //TODO listen to an event intead of using this timer?
                }, 1000);
//            });
        }
    });
