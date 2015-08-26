'use strict'

angular.module('evtrs-site').directive('socialButtons', function (BlogResource, $cookies, $timeout, $rootScope, $window) {

    return {
        restrict: 'E',
        templateUrl: 'components/social/social-buttons.html',
        controller: function ($element, $scope) {

            $scope.social = {};
            $scope.showSocialIcons = function () {
                var socialIcons = $element[0].querySelector('.social-icons');
                socialIcons.style.opacity = '1';
                $timeout(function () {
                    return socialIcons.style.opacity = '0';
                }, 8000);
                $scope.social.twitterVia = 'eventures-io';
                $scope.social.shortUrl = BlogResource.getCurrentPost().shortUrl;
                $scope.social.shareText = BlogResource.getCurrentPost().title;
            };

            $scope.recommend = function (postId) {
                if (!$cookies.get('liked')) {
                     BlogResource.incrementRecommends().then(function () {
                        $cookies.set('liked', true);
                    })
                }
            }

            $scope.bookmarkArticle = function () {
                var tooltip = document.querySelector('span[data-hint="Read Later"]');
                var url = $window.location.href;
                var bookmarks = $cookies.getObject('bookmarks') || [];
                if (bookmarks.indexOf(url) === -1) {
                    bookmarks.unshift({url : url, title : BlogResource.getCurrentPost().title});
                    $cookies.putObject('bookmarks', bookmarks);

                }
                $scope.$broadcast('BOOKMARKED');
                if(tooltip){
                    tooltip.setAttribute('data-hint', 'Bookmarked');
                }

            };

        }
    }
});