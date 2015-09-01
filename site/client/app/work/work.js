'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $state) {
        $scope.activeProject;

        $scope.$on('LOAD_PROJECT', function (event, projectName) {
            $scope.activeProject = projectName;
        });

        $scope.closeProject = function () {
            //move to
            var portfolio = document.querySelector('.portfolio');
            portfolio.style.visibility = 'visible';
            $state.go('work');
        };

    });

