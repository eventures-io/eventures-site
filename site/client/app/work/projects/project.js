'use strict';

angular.module('evtrs-site')
    .controller('ProjectController', function ($scope, $rootScope, $state, $timeout) {

        $scope.$on('$viewContentLoaded',
            function(event){
               $rootScope.$broadcast('PROJECT_VIEW_LOADED', $scope.$parent.activeProject);
            });

        if (!$scope.activeProject) {
            //project is accessed from url.
                $timeout(function () {
                    $rootScope.$broadcast('LOAD_PROJECT', {name: $state.params.project, next: false});
                    //TODO listen to an event intead of using this timer?
                }, 1000);
        }
    });
