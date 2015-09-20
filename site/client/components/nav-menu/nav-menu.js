'use strict';

angular.module('evtrs-site').directive('navMenu', function ($state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/nav-menu/nav-menu.html',
        controller: function ($scope, $element) {

            var menu = $element[0].querySelector('.nav-menu');
            var ul = menu.querySelector('ul');
            var lis = menu.querySelector('li');
            var menuButton = menu.querySelector('.menu-btn');


            $scope.toggleMenu = function () {
                menu.classList.toggle('nav-menu-open');
                menu.classList.toggle('nav-menu-close');
                //TODO scale/unscale content
            };

            $scope.$on('HIDE_MENU_BTN', function() {
                 menuButton.classList.add('menu-btn-hidden');
            });

            $scope.$on('SHOW_MENU_BTN', function() {
                menuButton.classList.remove('menu-btn-hidden');
            });

            $scope.$on('STATE_CHANGE', function(event){
                //get el by id
                setActiveMenuItem(menuItem);

            });

        }
    }

});