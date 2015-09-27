'use strict'


angular.module('evtrs-site').animation('.animate-main', function () {
    return {
        enter: function ($element, done) {
            $element[0].style.zIndex = 99;
            $element[0].style.position = 'absolute';
            TweenLite.fromTo($element[0], .4, {css: {
                top: '100vh'
            }}, {css: {
                top: '0'
            },
                ease: Power2.easeOut
            });
        },
        leave: function ($element, done) {
            $element[0].style.zIndex = 98;
            TweenLite.to($element[0], 3, {css: {
                opacity: 0
            },
                ease: Power2.easeOut
            });
        }

    }


})