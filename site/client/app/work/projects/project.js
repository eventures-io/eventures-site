'use strict';

angular.module('evtrs-site')
    .controller('ProjectController', function ($scope, $rootScope, $state, $timeout) {

        if(!$scope.activeProject) {
            //project is accessed from url.
            $timeout(function(){
                var broadcast = function(){
                    $rootScope.$broadcast('LOAD_PROJECT', $state.params.project);
                }
                return broadcast();
            }, 2000);


        }
    });
