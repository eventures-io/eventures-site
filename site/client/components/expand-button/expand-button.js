'use-srict';

angular.module('evtrs-site').directive('expandButton', function ($rootScope, $state, $timeout) {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            var element = $element[0];

            function changeState(event) {
                var refreshIcon = element.querySelector('.refresh-icon');

                if (event.animationName === 'roll') {
                    return;
                }
                else if (event.animationName === 'expand') {

                    var portfolio = document.querySelector('.portfolio-section');
                    portfolio.classList.add('show');

                    $state.go('work');
                    $rootScope.$on('$stateChangeSuccess', function (event, current) {
                        if (current.name === 'work') {
                            refreshIcon.classList.add('show');
                            $timeout(function () {
                                element.classList.add('btn-expand-bkwd');
                            }, 800);
                        }
                    });
                }

                else if (event.animationName === 'contract') {
                    element.removeEventListener('animationend', changeState);
                    element.removeEventListener('webkitAnimationEnd', changeState);
                    element.classList.remove('btn-expand-fwd', 'btn-expand-bkwd');
                    element.classList.add('hide');
                    refreshIcon.classList.remove('show');
                }
            }

            element.onclick = function () {
                element.classList.add('btn-expand-fwd');
                element.addEventListener('animationend', changeState, true);
                element.addEventListener('webkitAnimationEnd', changeState, true);

            };
        }
    };
});
