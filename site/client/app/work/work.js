'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $rootScope, PROJECT_CONSTANTS, $state, $stateParams, $sce) {

        var activeProject;
        var siteActive = false;
        $scope.displaySite = false;

        if($stateParams.projectId){
            console.log('project');
        }

        $scope.$on('LOAD_PROJECT', function (event, projectName) {
            activeProject = projectName;
            $state.go('work.project', {project: projectName});
        });

        $scope.closeProject = function () {
                $rootScope.$broadcast('CLOSE_PROJECT', activeProject);
                $state.go('work');

        };

        $scope.openSite = function () {
            $rootScope.$broadcast('HIDE_MENU_BTN');
            //$scope.siteUrl = PROJECT_CONSTANTS[activeProject].siteUrl;
            $state.go('work.project.site', {project: activeProject});
        }

        $scope.closeSite = function() {
            $rootScope.$broadcast('SHOW_MENU_BTN');
            $state.go('work.project', {project: activeProject});
        }


        $scope.openNext = function () {

        }
    });

