'use strict';

angular.module('evtrs-site')
    .controller('HomeController', function ($scope) {


        $scope.expand =  function() {
            var sub = document.querySelector('.sub-1');
            sub.style.transform = 'scale(10,1)';
            sub.style.zIndex= '1';
        }




    });

