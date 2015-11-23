'use strict';


angular.module('evtrs-site').animation('.animate-home', function () {
    return {
        leave: function ($element, done) {
            $element[0].style.position = 'absolute';
            TweenLite.fromTo($element[0], .6, {css: { //
                    top: '0'
                }},
                {css: {
                    top: '-100vh'
                }}
            );
        }

    };

});