'use strict';

angular.module('evtrs-site').directive('zoom', function () {
    return {
        restrict: 'A',
        scope: { zoom: '@'},
        link: function (scope, element) {

            element[0].onclick = function (event) {
                element[0].classList.toggle(scope.zoom);
            }
        }
    };

});