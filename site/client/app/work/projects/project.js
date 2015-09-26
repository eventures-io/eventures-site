'use strict';

angular.module('evtrs-site')
    .controller('ProjectController', function ($scope, $rootScope, $state, $timeout) {

        if (!$scope.activeProject) {
            //project is accessed from url.
            $scope.$on('APP_LOADED', function () {
                $timeout(function () {
                    var broadcast = function () {
                        $rootScope.$broadcast('LOAD_PROJECT', $state.params.project);
                    }
                    return broadcast();
                    //TODO is it possible to listen to an event intead of this timer?
                }, 1000);
            });
        }
    });
