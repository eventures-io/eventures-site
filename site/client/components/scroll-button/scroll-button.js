'use strict'

angular.module('evtrs-site').directive('scrollButton', function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope) {
            $scope.scrollTo = function (anchorId) {
                var anchor2 = document.querySelector('#' + anchorId);
                TweenLite.to(window, 2, {scrollTo:{y:anchor.offsetTop}, ease:Power2.easeOut});
                //anchor.scrollIntoView({block: "end", behavior: "smooth"});
            }

        }

    }


});