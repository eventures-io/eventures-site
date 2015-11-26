'use strict'

angular.module('evtrs-site').directive('viewSiteButton', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/view-site-button/view-site-button.html',
        scope: {
          window: '@'
        },
        link: function (scope, element) {
            element[0].querySelector('button').onclick = function () {
              scope.$emit('OPEN_SITE', scope.window);
            }
        }
    }
});