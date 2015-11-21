'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $rootScope, PROJECT_CONSTANTS, $state, $window) {

        $scope.displaySite = false;

        $scope.$on('LOAD_PROJECT', function (event, project) {
            $scope.activeProject = project.name;
            $state.go('work.project', {project: project.name});
        });

        $scope.$on('CLOSE_ACTIVE_PROJECT', function () {
            $rootScope.$broadcast('CLOSE_PROJECT', $scope.activeProject);
        });

        $scope.closeProject = function () {
            $rootScope.$broadcast('CLOSE_PROJECT', $scope.activeProject);
            $state.go('work');
        };

        $scope.viewOnGithub = function () {
            var githubUrl = "https://github.com/eventures-io/".concat(PROJECT_CONSTANTS[$scope.activeProject].githubUrl);
            $window.open(githubUrl);
        }

        $scope.openSite = function (blank) {
            if (!blank) {
                $rootScope.$broadcast('HIDE_MENU_BTN');
                $scope.siteUrl = PROJECT_CONSTANTS[$scope.activeProject].siteUrl;
                $state.go('work.project.site', {project: $scope.activeProject});
            } else {
                $window.open(PROJECT_CONSTANTS[$scope.activeProject].siteUrl);
            }
        };

        $scope.closeSite = function () {
            $rootScope.$broadcast('SHOW_MENU_BTN');
            $state.go('work.project', {project: $scope.activeProject});
        };

        $scope.iterateProjects = function (iterator) {
            var projects = Object.keys(PROJECT_CONSTANTS);
            var index = projects.indexOf($scope.activeProject);
            if (iterator === 'next') {
                index = index === projects.length - 1 ? 0 : ++index;
            } else {
                index = index === 0 ? projects.length -1 : --index;
            }
            $rootScope.$broadcast('LOAD_PROJECT', {name: projects[index], next: true});
        };

    });


