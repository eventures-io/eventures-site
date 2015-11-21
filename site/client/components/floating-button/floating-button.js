'use strict'

angular.module('evtrs-site').directive('floatingButton', function ($timeout) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'components/floating-button/floating-button.html',
        scope: {},
        link: function (scope, element, attrs) {


            var element = element[0];
            if (attrs.direction === 'next') {
                element.querySelector('img').src = 'assets/images/forward-btn-round.svg';
                element.classList.add('right');
            } else {
                element.querySelector('img').src = 'assets/images/back-btn-round.svg';
                element.classList.add('left');
            }
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
                    timeline.to(element, .4, {css: {transform: 'translateY(-7px)' }, ease: Power2.easeInOut})
                        .to(element, .9, {css: {transform: 'translateY(0)' }, ease: Power2.easeInOut});
                } else {
                    timeline.to(element, .4, {css: {transform: 'translateY(7px)' }, ease: Power2.easeInOut})
                        .to(element, .9, {css: {transform: 'translateY(0)' }, ease: Power2.easeInOut});
                }
            });

            scope.$on('SCROLLED_TO_BOTTOM', function(){
                element.classList.add('visible');
            })

        }
    }
});