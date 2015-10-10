'use strict'

angular.module('evtrs-site').directive('scrollTo', function () {
    return {
        restrict: 'A',
        scope: {
            scrollTo: '@'
        },
        link: function (scope, element) {

            element[0].onclick = function () {
                var anchor = document.querySelector('#' + scope.scrollTo);
                TweenLite.to(window, 1.5, {scrollTo:{y:anchor.offsetTop}, ease:Power2.easeOut});
            }
        }
    }
});