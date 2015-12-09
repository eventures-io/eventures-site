'use strict';

angular.module('evtrs-site').directive('zoom-disabled', function () {
    return {
        restrict: 'A',
        scope: { zoom: '@'},
        link: function (scope, element) {

            element[0].onclick = function (event) {
                if (window.innerWidth > 768) {
                    element[0].classList.toggle(scope.zoom);
                }
            }
        }
    };

});