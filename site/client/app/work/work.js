'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $state) {

        $scope.activeProject;

        $scope.$on('LOAD_PROJECT', function (event, projectName) {
            $scope.activeProject = projectName;
        });

        $scope.closeProject = function () {
            //move to directive
            var portfolio = document.querySelector('.portfolio');
            portfolio.style.visibility = 'visible';
            var projectImg = document.querySelector('.project-img');
            document.body.removeChild(projectImg);
            $state.go('work');
        };

    });

