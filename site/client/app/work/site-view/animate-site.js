'use strict'


angular.module('evtrs-site').animation('.animate-site', function () {
    return {
        enterActive: function ($element, done) {

        },
        enter: function ($element, done) {
            $element[0].style.visibility = 'visible';
            $element[0].style.position = 'absolute';
            TweenLite.fromTo($element[0], 0.4, {css: {
                top: '100vh'
            }}, {css: {
                top: '0'
            },
                ease: Power2.easeOut
            });
        },
        leave: function ($element, done) {

            $element[0].style.position = 'absolute';
            TweenLite.to($element[0], 0.4, {css: {
                top: '-100vh'
            },
                ease: Power2.easeOut,
                onComplete: function () {
                    $element[0].style.visibility = 'hidden';
                }
            });
        }

    }


})