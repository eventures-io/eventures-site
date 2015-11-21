"use strict";

angular.module('evtrs-site')

    .constant('PROJECT_CONSTANTS', {
        'ocean-feedr': {bgColor: '#dcdcdc', image: {src: 'assets/images/ocean-feedr.png'}, outerHeight: '70vh', position:'left', siteUrl: 'http://oceanfeedr.herokuapp.com', sourceUrl: 'https://github.com/eventures-io/ocean-feedr'},
        polaroiz: {bgColor: '#dcdcdc', image: {src: 'assets/images/polaroiz.png'}, outerHeight: '76vh', position:'left', siteUrl: 'http://polaroiz.herokuapp.com', sourceUrl: 'https://github.com/eventures-io/polaroiz'},
        'plantzr-mobile': {bgColor: '#dcdcdc', image: {src: 'assets/images/plantzr-mobile.png'}, outerHeight: '73vh', position:'left',sourceUrl: 'https://github.com/eventures-io/plantzr-mobile'},
        plantzr: {bgColor: '#dcdcdc', image: {src: 'assets/images/plantzr.png'}, outerHeight: '80vh', position:'right',siteUrl: 'http://plantzr.herokuapp.com', sourceUrl: 'https://github.com/eventures-io/plantzr'},
        'angular-loader': {bgColor: '#dcdcdc', image: {src: 'assets/images/angular-loader.png'}, outerHeight: '74vh', position:'right',siteUrl: 'http://eventures-io.github.io/angular-loader-directive/', sourceUrl: 'https://github.com/eventures-io/angular-loader-directive'},
        'plantzr-proto': {bgColor: '#dcdcdc', image: {src: 'assets/images/plantzr-splash.png'}, outerHeight: '82vh', position:'right',sourceUrl: 'https://github.com/eventures-io/plantzr-mobile'}

    });