"use strict";

angular.module('evtrs-site')

    .constant('PROJECT_CONSTANTS', {
        'ocean-feedr': {bgColor: '#efefef', image: {src: 'assets/images/ocean-feedr.png'}, outerHeight: '70vh', position:'left', siteUrl: 'http://oceanfeedr.herokuapp.com', githubUrl: 'ocean-feedr'},
        polaroiz: {bgColor: '#efefef', image: {src: 'assets/images/polaroiz.png'}, outerHeight: '76vh', position:'left', siteUrl: 'http://polaroiz.herokuapp.com', githubUrl: 'polaroiz'},
        'plantzr-mobile': {bgColor: '#808080', image: {src: 'assets/images/plantzr-mobile.png'}, outerHeight: '73vh', position:'left',githubUrl: 'plantzr-mobile'},
        plantzr: {bgColor: '#efefef', image: {src: 'assets/images/plantzr.png'}, outerHeight: '80vh', position:'right',siteUrl: 'http://plantzr.herokuapp.com', githubUrl: 'plantzr'},
        'angular-loader': {bgColor: '#efefef', image: {src: 'assets/images/angular-loader.png'}, outerHeight: '74vh', position:'right',siteUrl: 'http://eventures-io.github.io/angular-loader-directive/', githubUrl: 'angular-loader-directive'},
        'plantzr-proto': {bgColor: '#efefef', image: {src: 'assets/images/plantzr-splash.png'}, outerHeight: '82vh', position:'right',githubUrl: 'plantzr-mobile'}

    });