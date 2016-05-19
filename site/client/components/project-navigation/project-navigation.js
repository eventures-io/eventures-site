'use strict'

angular.module('evtrs-site').directive('projectNavigation', function ($timeout, ScrollService, $rootScope) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'components/project-navigation/project-navigation.html',
        link: function (scope, element) {
            var el = element[0];
            var iterator = scope.getProjectIterator();

            //check if iterating or direct url access
            if(iterator.next) {
                scope.nextProject = iterator.next;
                scope.previousProject = iterator.previous;

                scope.$on('SCROLLED_TO_BOTTOM', function () {
                    el.classList.add('visible');
                });
            }
        },
        controller: function ($scope, $element) {
            $scope.goToProject = function (projectName, $event) {
                var timeline = new TimelineLite();
                timeline
                    .to($event.currentTarget, .2, {css: {right: '-180px'}})
                    .to($element[0], .4, {css: {right: '-250px'}}, "+=.3")
                    .call(function () {
                        ScrollService.scrollToTop(function () {
                            $rootScope.$broadcast('LOAD_PROJECT', {name: projectName, next: true});
                        });
                    }, null, '+=.5');
            }
        }
    }
});