'use strict'

angular.module('evtrs-site').directive('socialButtons', function (BlogResource, $cookies, $timeout, $window) {

    return {
        restrict: 'E',
        templateUrl: 'components/social/social-buttons.html',
        scope: {

        },
        link: function (element, scope, attrs) {


        },
        controller: function ($element, $scope) {

            $scope.currentUrl = $window.location.href;

            //TODO select from $element instead of document
            $scope.toggleSocialIcons = function () {
                var socialIcons = $element[0].querySelector('.social-icons');
                socialIcons.style.opacity = socialIcons.style.opacity === '0' ? '1' : '0';
                if(socialIcons.style.opacity === '1') {
                    $timeout(function(){
                        return $scope.toggleSocialIcons();
                    }, 8000);
                }
            };

            $scope.recommend = function (postId) {
                if (!$cookies.get('liked')) {
                    BlogResource.incrementRecommends().then(function () {
                        $cookies.set('liked', true);
                        //set tooltiptext to 'you already liked'
                    });

                }
            };

            $scope.bookmarkArticle = function (title) {
                var bookmarkURL = window.location.href;
                var bookmarkTitle = title;
                var triggerDefault = false;

                if (window.sidebar && window.sidebar.addPanel) {
                    // Firefox version < 23
                    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
                }
//                else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
//                    // Firefox version >= 23 and Opera Hotlist
//                    var $this = $(this);
//                    $this.attr('href', bookmarkURL);
//                    $this.attr('title', bookmarkTitle);
//                    $this.attr('rel', 'sidebar');
//                    //$this.off(e);
//                    triggerDefault = true;
//                }
                else if (window.external && ('AddFavorite' in window.external)) {
                    // IE Favorite
                    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                } else {
                    // WebKit - Safari/Chrome
                    var tooltipText = 'Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark.';
                    var bookmarkBtn = document.querySelector('span[data-hint="Bookmark"]');
                    bookmarkBtn.setAttribute('data-hint', tooltipText);
                }

                return triggerDefault;
            };
        }
    };


});