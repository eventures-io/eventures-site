'use-srict';

angular.module('evtrs-site').directive('expandButton', function ($rootScope, $state, $timeout) {
    return {
        restrict: 'A',
        controller: function ($scope, $element) {
            var element = $element[0];

            function changeState(event) {
                var projectTransition = element.querySelector('.project-transition');
                var fill = element.querySelector('.project-transition-fill');
                if (event.animationName === 'roll') {
                    return;
                }
                else if (event.animationName === 'expand') {
                    var portfolio = document.querySelector('.portfolio-section');
                    portfolio.style.visibility = 'visible';
                    portfolio.style.opacity = '1';

                    $state.go('work');
                    $rootScope.$on('$stateChangeSuccess', function (event, current) {
                        if (current.name === 'work') {

                            $timeout(function () {
                            projectTransition.classList.add('show');
                            fill.classList.add('project-transition-draw');
                                $timeout(function () {
                                    element.classList.add('btn-expand-bkwd');
                                    projectTransition.classList.remove('show');
                                }, 700)
                            }, 300);
                        }
                    });
                }

                else if (event.animationName === 'contract') {
                    element.removeEventListener('animationend', changeState);
                    element.removeEventListener('webkitAnimationEnd', changeState);
                    element.classList.remove('btn-expand-fwd', 'btn-expand-bkwd');
                    element.classList.add('hide');
                    fill.classList.remove('project-transition-draw');
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
