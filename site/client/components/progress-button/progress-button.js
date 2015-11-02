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
                circleProgress.addEventListener("webkitAnimationEnd" , loadButtonEventListener, true);
                $scope.updateProgress();
            }

            $scope.updateProgress = function () {
                circleProgress.classList.add('circle-animate');
            };

            var loadButtonEventListener = function(event) {
                circleProgress.removeEventListener("animationend webkitAnimationEnd", loadButtonEventListener, true);
                circleProgress.classList.remove('circle-animate');
                $timeout(function(){
                    $scope.$emit('LOAD_PROJECT', {name:$scope.project.name, next: false});
                    progressButton.style.visibility = 'hidden';
                    circleProgress.style.strokeDashoffset = 615;
                }, 200);
            };
        }
    };

});
