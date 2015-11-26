'use strict'

angular.module('evtrs-site').directive('scrollButton', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/scroll-button/scroll-button.html',
        scope: {
            to: '@'
        },
        link: function (scope, element) {
            element[0].querySelector('i').onclick = function () {
                var anchor = document.querySelector('#' + scope.to);
                TweenLite.to(window, 1.2, {scrollTo:{y:anchor.offsetTop}, ease:Power4.easeInOut});
            }
        }
    }
});