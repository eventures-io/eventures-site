'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $rootScope) {

        var activeProject;

        $scope.$on('LOAD_PROJECT', function (event, projectName) {
            activeProject = projectName;
        });

        $scope.closeProject = function () {
            //move to directive
            $rootScope.$broadcast('CLOSE_PROJECT', activeProject);
        };

    });

