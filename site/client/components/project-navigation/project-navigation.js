'use strict'

angular.module('evtrs-site').directive('projectNavigation', function ($timeout, ScrollService, $rootScope) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'components/project-navigation/project-navigation.html',
        link: function (scope, element) {
            var el = element[0];
            var running = false;
            var timeline = new TimelineLite({onComplete: function () {
                $timeout(function () {
                    running = false;
                }, 500)
            }});

            window.addEventListener('mousewheel', function (event) {
                if (running) {
                    return;
                }
                running = true;
                var delta = event.wheelDelta;
                if (delta > 0) {
                    timeline.to(el, .4, {css: {transform: 'translateY(-7px)' }, ease: Power2.easeInOut})
                        //TODO: use bounce ease instead
                        .to(el, .9, {css: {transform: 'translateY(0)' }, ease: Power2.easeInOut});
                } else {
                    timeline.to(el, .4, {css: {transform: 'translateY(7px)' }, ease: Power2.easeInOut})
                        .to(el, .9, {css: {transform: 'translateY(0)' }, ease: Power2.easeInOut});
                }
            });

            scope.$on('SCROLLED_TO_BOTTOM', function () {
                var iterator = scope.getIterator();
                scope.nextProject = iterator.next;
                scope.previousProject = iterator.previous;
                el.classList.add('visible');
            })


        },
        controller: function ($scope) {
            $scope.goToProject = function (projectName) {
                ScrollService.scrollToTop(function () {
                    $rootScope.$broadcast('LOAD_PROJECT', {name: projectName, next: true});
                });
            }
        }
    }
});