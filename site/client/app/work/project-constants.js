"use strict";

angular.module('evtrs-site')

    .constant('PROJECT_CONSTANTS', {
        'ocean-feedr': {bgColor: '#efefef', image: {src: 'assets/images/ocean-feedr.png', paddingTop: '0px'}, siteUrl: 'http://oceanfeedr.herokuapp.com', githubUrl: 'ocean-feedr'},
        polaroiz: {bgColor: '#efefef', image: {src: 'assets/images/polaroiz.png', paddingTop: '0px'}, siteUrl: 'http://polaroiz.herokuapp.com', githubUrl: 'polaroiz'},
        'plantzr-mobile': {bgColor: '#efefef', image: {src: 'assets/images/plantzr-mobile.png', paddingTop: '0px'}, githubUrl: 'plantzr-mobile'},
        plantzr: {bgColor: '#efefef', image: {src: 'assets/images/plantzr.png', paddingTop: '0px'}, siteUrl: 'http://plantzr.herokuapp.com', githubUrl: 'plantzr'},
        'angular-loader': {bgColor: '#efefef', image: {src: 'assets/images/angular-loader.png', paddingTop: '0px'}, siteUrl: 'http://eventures-io.github.io/angular-loader-directive/', githubUrl: 'angular-loader-directive'}
    });