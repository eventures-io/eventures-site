'use strict'

angular.module('evtrs-site').directive('progressButton', function ($timeout) {

    return {
        templateUrl: 'components/progress-button/progress-button.html',
        controller: function ($scope, $element) {

            var progressButton = $element[0].querySelector('.progress-button');
            var circleProgress = progressButton.querySelector('.circle-progress');
            var circleInner = progressButton.querySelector('.circle-inner');

            $scope.loadProject = function() {
                circleProgress.addEventListener("animationend" , loadButtonEventListener, true);
                //circleProgress.addEventListener("webkitAnimationEnd" , loadButtonEventListener, true);
                $scope.updateProgress();
            }

            $scope.updateProgress = function () {
                progressButton.style.visibility = 'visible';
                progressButton.style.opacity = '1';
                circleProgress.classList.add('circle-animate');
            };

            var loadButtonEventListener = function(event) {
                circleProgress.removeEventListener("animationend webkitAnimationEnd", loadButtonEventListener, true);
                circleProgress.classList.remove('circle-animate');
                circleProgress.style.r = 75;
                circleInner.style.r= 45;
                $timeout(function(){
                    $scope.$emit('LOAD_PROJECT', {name:$scope.project.name, next: false});
                    progressButton.style.visibility = 'hidden';
                    progressButton.style.opacity = '0';
                    circleProgress.style.strokeDashoffset = 615;
                }, 200);
            };
        }
    };

});
