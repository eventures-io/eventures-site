'use strict'

angular.module('evtrs-site').directive('progressButton', function ($timeout) {

    return {
        templateUrl: 'components/progress-button/progress-button.html',
        controller: function ($scope, $element) {

            var progressButton = $element[0].querySelector('.progress-button');
            var circleProgress = progressButton.querySelector('.circle-progress');
            var circleInner = progressButton.querySelector('.circle-inner');

            $scope.loadProject = function() {
                circleProgress.addEventListener("transitionend", loadButtonEventListener, true);
                $scope.updateProgress(100);
            }

            $scope.updateProgress = function (progress) {
                progressButton.style.visibility = 'visible';
                progressButton.style.opacity = '1';

                var val = progress;
                if (isNaN(val)) {
                    val = 100;
                }

                var rValue = window.getComputedStyle(circleProgress, null).getPropertyValue('r');
                var r = parseInt(rValue, 10);
                var c = 615 //Math.PI * (r * 2);

                if (val < 0) {
                    val = 0;
                }
                else if (val > 100) {
                    val = 100;
                }

                var pct = ((100 - val) / 100) * c;

                circleProgress.style.strokeDashoffset = pct;

            }

            var loadButtonEventListener = function(event) {
                circleProgress.removeEventListener("transitionend", loadButtonEventListener, true);
                circleProgress.style.r = 75;
                circleInner.style.r= 45;
                $timeout(function(){
                    $scope.$emit('LOAD_PROJECT', $scope.project.name);
                    progressButton.style.visibility = 'hidden';
                    progressButton.style.opacity = '0';
                    circleProgress.style.strokeDashoffset = 615;
                }, 200);
            }
        }
    };

});
