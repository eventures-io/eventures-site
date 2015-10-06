'use strict'

angular.module('evtrs-site').directive('socialButtons', function (NotesResource, $cookies, $timeout, $rootScope, $window) {

    return {
        restrict: 'E',
        templateUrl: 'components/social/social-bar.html',
        controller: function ($element, $scope) {

            $scope.social = {};
            $scope.showSocialIcons = function () {
                var socialIcons = $element[0].querySelector('.social-icons');
                socialIcons.style.opacity = '1';
                $timeout(function () {
                    return socialIcons.style.opacity = '0';
                }, 8000);
                $scope.social.twitterVia = 'eventures-io';
                $scope.social.shortUrl = NotesResource.getCurrentPost().shortUrl;
                $scope.social.shareText = NotesResource.getCurrentPost().title;
            };

            $scope.recommend = function () {
                var likes = $cookies.get('blog-likes') || [];
                var title = NotesResource.getCurrentPost().title;
                if (likes.indexOf(title)== -1) {
                     NotesResource.incrementLikes(NotesResource.getCurrentPost().ID).then(function () {
                        likes.push(title);
                        $cookies.setObject('blog-likes', likes);
                    });
                }
            };

            $scope.bookmarkArticle = function () {
                var tooltip = document.querySelector('span[data-hint="Read Later"]');
                var url = $window.location.href;
                var bookmarks = $cookies.getObject('bookmarks') || [];
                if (bookmarks.indexOf(url) === -1) {
                    bookmarks.unshift({url : url, title : NotesResource.getCurrentPost().title});
                    $cookies.putObject('bookmarks', bookmarks);
                    $scope.$emit('BOOKMARKED');
                }
                if(tooltip){
                    tooltip.setAttribute('data-hint', 'Bookmarked');
                }
            };

        }
    }
});