'use strict'

angular.module('evtrs-site').directive('progressButton', function(){

      return {

          restrict: 'E',
          templateUrl: 'components/progress-button/progress-button.html',
          scope:{

          },
          controller: function($scope, $element){

               $scope.updateProgress =   function(percentage){

                  var percent = percentage;
                  var circle = $element[0].querySelector('#svg #bar');

                  if (isNaN(percentage)) {
                      percent = 100;
                  }
                  else{
                      var r = circle.getAttribute('r');
                      var c = Math.PI*(r*2);

                      if (val < 0) { val = 0;}
                      if (val > 100) { val = 100;}

                      var pct = ((100-val)/100)*c;

                      circle.style.strokeDashoffset= pct;
                  }
              }
          }
      };

});
