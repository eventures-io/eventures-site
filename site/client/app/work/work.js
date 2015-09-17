'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $rootScope, PROJECT_CONSTANTS, $state, $sce) {

        var activeProject
        var siteActive = false;
        $scope.displaySite = false;

        $scope.$on('LOAD_PROJECT', function (event, projectName) {
            activeProject = projectName;
        });

        $scope.closeProject = function () {
            if(siteActive){
                $state.go('work.project', {project: activeProject})
            } else {
                $rootScope.$broadcast('CLOSE_PROJECT', activeProject);
            }
        };

        $scope.openSite = function () {
            siteActive = true;
            $state.go('work.project.site', {project: activeProject});
            var url = $sce.trustAsResourceUrl(PROJECT_CONSTANTS[activeProject].siteUrl);
            $scope.siteUrl = url;
        }

        $scope.openNext = function () {

        }
    });

