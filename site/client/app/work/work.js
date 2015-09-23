'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $rootScope, PROJECT_CONSTANTS, $state) {

        $scope.displaySite = false;

        $scope.$on('LOAD_PROJECT', function (event, projectName) {
            $scope.activeProject = projectName;
            $state.go('work.project', {project: projectName});
        });

        $scope.$on('CLOSE_ACTIVE_PROJECT', function() {
            $rootScope.$broadcast('CLOSE_PROJECT', $scope.activeProject);
        })

        $scope.closeProject = function () {
            $rootScope.$broadcast('CLOSE_PROJECT', $scope.activeProject);
            $state.go('work');
        };

        $scope.openSite = function () {
            $rootScope.$broadcast('HIDE_MENU_BTN');
            $scope.siteUrl = PROJECT_CONSTANTS[$scope.activeProject].siteUrl;
            $state.go('work.project.site', {project: $scope.activeProject});
        };

        $scope.closeSite = function () {
            $rootScope.$broadcast('SHOW_MENU_BTN');
            $state.go('work.project', {project: $scope.activeProject});
        };

        $scope.openNext = function () {
            var next = false;
            _.forIn(PROJECT_CONSTANTS, function (project, key) {

                if (key === $scope.activeProject) {
                    next = true;
                } else if (next) {
                    $rootScope.$broadcast('LOAD_PROJECT', key);
                    next = false;
                };
            });
        };

    });


