'use strict';

angular.module('evtrs-site').directive('navMenu', function ($state, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'components/nav-menu/nav-menu.html',
        controller: function ($scope, $rootScope, $element) {

            var element = $element[0];
            var menu = element.querySelector('.nav-menu');
            var ul = menu.querySelector('ul');
            var menuButton = menu.querySelector('.menu-btn');

            $scope.toggleMenu = function () {
                element.addEventListener("transitionend", menuTransitionEnd, true);
                menu.classList.toggle('nav-menu-open');
                menu.classList.toggle('nav-menu-close');
                //TODO scale/unscale content

            };

            ul.onclick = function (event) {
                $rootScope.$broadcast('CLOSE_ACTIVE_PROJECT');
                var target = event.target || event.srcElement;
                if (target == 'blog') {
                    hideMenuButton();
                } else {
                    showMenuButton();
                }
                $scope.state = target.id;
                $scope.toggleMenu();
                $timeout(function () {
                    return $state.go($scope.state);
                }, 400);
            };

            $scope.$on('HIDE_MENU_BTN', function () {

                hideMenuButton();
            });

            $scope.$on('SHOW_MENU_BTN', function () {
                showMenuButton();
            });

            var hideMenuButton = function () {
                menuButton.classList.add('menu-btn-hidden');
            }

            var showMenuButton = function () {
                menuButton.classList.remove('menu-btn-hidden');
            }

            var menuTransitionEnd = function (event) {
                element.removeEventListener("transitionend", menuTransitionEnd, true);

            }

        }
    }

});