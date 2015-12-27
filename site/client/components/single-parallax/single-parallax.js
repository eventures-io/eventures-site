'use strict';

angular.module('evtrs-site').directive('singleParallax', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element) {

            element[0].onmousemove = function (event) {
                var amountMovedX = (event.pageX * -1 / 30);
                var amountMovedY = (event.pageY * -1 / 30);
                //TODO http://codepen.io/rachsmith/post/animation-tip-lerp
                //use requestAnimationFrame. If still jerky, use css absolute positioning of the image
                element[0].querySelector('.home-bg-img').style.backgroundPosition = Math.round(amountMovedX) + 'px ' + Math.round(amountMovedY) + 'px';
//                element[0].querySelector('.home-bg-img').style.backgroundPosition= "300px 300px";

            };

            element[0].querySelector('.home-scroll-btn').onclick = function() {
                $rootScope.$broadcast('GO_TO_WORK');
            };
        }

    };

});



