'use strict';

angular.module('evtrs-site').directive('navMenu', function ($state) {
    return {
        restrict: 'E',
        templateUrl: 'components/nav-menu/nav-menu.html',
        controller: function ($scope, $element) {

            var menu = $element[0].querySelector('.nav-menu');
            var ul = menu.querySelector('ul');

            $scope.toggleMenu = function () {
                menu.classList.toggle('nav-menu-open');
                menu.classList.toggle('nav-menu-close');
                //TODO scale/unscale content
            };

            ul.onclick= function(event) {
                var state =  event.srcElement.id;
                $scope.toggleMenu();
                $state.go(state);


            };



        }
    }

});