'use strict'

angular.module('evtrs-site').directive('progressButton', function () {

    return {

        restrict: 'E',
        templateUrl: 'components/progress-button/progress-button.html',
//        scope: {
//
//        },
        controller: function ($scope, $element, $attrs) {
//            var project = $attrs.project;
            var circle = $element[0].querySelector('.circle-progress');


            $scope.loadProject = function() {
                circle.addEventListener("transitionend", loadButtonEventListener, true);
                $scope.updateProgress(100);
            }

            $scope.updateProgress = function (progress) {

                var val = progress;
                if (isNaN(val)) {
                    val = 100;
                }

                var rValue = window.getComputedStyle(circle, null).getPropertyValue('r');
                var r = parseInt(rValue, 10);
                var c = 615 //Math.PI * (r * 2);

                if (val < 0) {
                    val = 0;
                }
                else if (val > 100) {
                    val = 100;
                }

                var pct = ((100 - val) / 100) * c;

                circle.style.strokeDashoffset = pct;

            }

            var loadButtonEventListener = function(event) {
                circle.removeEventListener("transitionend", loadButtonEventListener, true);
                $scope.$emit('LOAD_PROJECT', $scope.project.name);
                circle.style.strokeDashoffset = 615;

            }
        }
    };

});
