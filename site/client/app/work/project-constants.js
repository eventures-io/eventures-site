"use strict";

angular.module('evtrs-site')

    .constant('PROJECT_CONSTANTS', {
        oceanfeedr: {bgColor: '#efefef', image: {src: 'assets/images/ocean-feedr.png', paddingTop: '0px'}, siteUrl: 'http://oceanfeedr.herokuapp.com'},
        polaroiz: {bgColor: '#efefef', image: {src: 'assets/images/polaroiz.png', paddingTop: '0px'}, siteUrl: 'http://polaroiz.herokuapp.com' },
        plantzrmob: {bgColor: '#efefef', image: {src: 'assets/images/plantzr-mobile.png', paddingTop: '0px' }},
        plantzr: {bgColor: '#efefef', image: {src: 'assets/images/plantzr.png', paddingTop: '0px'}, siteUrl: 'http://plantzr.herokuapp.com'},
        dribble: {bgColor: '#efefef', image: {src: 'assets/images/logo1.png' , paddingTop: '0px'}}
    });