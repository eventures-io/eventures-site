"use strict";

angular.module('evtrs-site')

    .constant('PROJECT_CONSTANTS', {
        'ocean-feedr': {bgColor: '#dcdcdc', image: {src: 'assets/images/ocean-feedr/ocean-feedr.png'}, outerHeight: '70vh', position:'left', siteUrl: 'http://oceanfeedr.herokuapp.com', sourceUrl: 'ocean-feedr'},
        polaroiz: {bgColor: '#dcdcdc', image: {src: 'assets/images/polaroiz/polaroiz.png'}, outerHeight: '76vh', position:'left', siteUrl: 'http://polaroiz.herokuapp.com', sourceUrl: 'polaroiz'},
        plantzr: {bgColor: '#dcdcdc', image: {src: 'assets/images/plantzr/plantzr.png'}, outerHeight: '73vh', position:'right',siteUrl: 'http://plantzr.herokuapp.com', sourceUrl: 'plantzr'},
        'plantzr-mobile': {bgColor: '#dcdcdc', image: {src: 'assets/images/plantzr-mobile.png'}, outerHeight: '80vh', position:'left',sourceUrl: 'plantzr-mobile'},
        'angular-loader': {bgColor: '#dcdcdc', image: {src: 'assets/images/angular-loader.png'}, outerHeight: '74vh', position:'right',siteUrl: 'http://eventures-io.github.io/angular-loader-directive/', sourceUrl: 'angular-loader-directive'},
        'plantzr-proto': {bgColor: '#dcdcdc', image: {src: 'assets/images/plantzr-splash.png'}, outerHeight: '82vh', position:'right',sourceUrl: 'plantzr-mobile'},
        'form-builder': {bgColor: '#dcdcdc', image: {src: 'assets/images/form-builder/form-builder.png'}, outerHeight: '76vh', position:'right'}
    });