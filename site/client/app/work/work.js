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
            // ScrollService.scrollToTop(function() {
            $rootScope.$broadcast('CLOSE_PROJECT', $scope.activeProject);
            $state.go('work');
            //})
        };

        $scope.viewSource = function () {
            var githubUrl = "https://github.com/eventures-io/".concat(PROJECT_CONSTANTS[$scope.activeProject].sourceUrl);
            $window.open(githubUrl);
        }


        $scope.$on('OPEN_SITE', function (event, window) {
            $scope.openSite(window);
        });

        $scope.openSite = function (window) {
            if (window === 'iframe') {
                $rootScope.$broadcast('HIDE_MENU_BTN');
                $scope.siteUrl = PROJECT_CONSTANTS[$scope.activeProject].siteUrl;
                $state.go('work.project.site', {project: $scope.activeProject});
            } else {
                $window.open(PROJECT_CONSTANTS[$scope.activeProject].siteUrl);
            }
        }

        $scope.closeSite = function () {
            $rootScope.$broadcast('SHOW_MENU_BTN');
            $state.go('work.project', {project: $scope.activeProject});
        };


        $scope.getProjectIterator = function () {

            var projects = Object.keys(PROJECT_CONSTANTS);
            if($scope.activeProject) {
                var index = projects.indexOf($scope.activeProject);

                var fwdIndex = index === projects.length - 1 ? 0 : index + 1;
                var bkwdIndex = index === 0 ? projects.length - 1 : index - 1;

                return {next: projects[fwdIndex], previous: projects[bkwdIndex]};
            }  else {
                return {};
            }

        };

    });


