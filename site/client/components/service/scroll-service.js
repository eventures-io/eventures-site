'use strict';
angular.module('evtrs-site').factory('ScrollService', function () {
    //taken from http://jsfiddle.net/W75mP/

    var getScrollXY = function () {
        var scrOfX = 0, scrOfY = 0;
        if (typeof( window.pageYOffset ) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && ( document.body.scrollLeft || document.body.scrollTop )) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop )) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [ scrOfX, scrOfY ];
    }

    var getDocHeight = function () {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    var scrolledToBottom = function () {
        if (getDocHeight() == getScrollXY()[1] + window.innerHeight) {
            return true;
        }
        return false;
    }

    var scrollToTop = function (onCompleteFunction) {
        TweenLite.to(window, .6, {scrollTo: {y: 0}, ease: Power2.easeOut, onComplete: onCompleteFunction});
    };

    return {
        scrolledToBottom: scrolledToBottom,
        scrollToTop: scrollToTop
    };


});