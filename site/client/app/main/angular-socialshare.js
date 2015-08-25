/*global angular*/
/*eslint no-loop-func:0, func-names:0*/

(function withAngular(angular) {
    'use strict';

    angular.module('720kb.socialshare', [])
        .directive('socialshare', ['$window', '$location',
            function manageDirective($window, $location) {

                return {
                    'restrict': 'A',
                    'link': function linkingFunction($scope, element, attr) {

                        var key
                            , attributeName
                            , properties = {}
                            , propDefaults = {
                                'url': '',
                                'redirectUri': '',
                                'provider': '',
                                'type': '',
                                'text': '',
                                'caption': '',
                                'to': '',
                                'ref': '',
                                'display': '',
                                'from': '',
                                'media': '',
                                'hashtags': '',
                                'via': '',
                                'description': '',
                                'source': '',
                                'subreddit': '',
                                'popupHeight': 500,
                                'popupWidth': 500
                            };
                        // observe the values in each of the properties so that if they're updated elsewhere,
                        // they are updated in this directive.
                        for (key in propDefaults) {
                            if (propDefaults.hasOwnProperty(key)) {
                                attributeName = 'socialshare' + key.substring(0, 1).toUpperCase() + key.substring(1);
                                (function observePropValues(keyName) {
                                    attr.$observe(attributeName, function observeAttrs(value) {
                                        if (value) {
                                            properties[keyName] = value;
                                        }
                                    });
                                }(key));
                                if (properties[key] === undefined) {
                                    properties[key] = propDefaults[key];
                                }
                            }
                        }

                        properties.eventTrigger = attr.socialshareTrigger || 'click';

                        $scope.facebookShare = function manageFacebookShare(data) {
                            var popupLocation = getPopupLocation(data.popupWidth, data.popupHeight);

                            if (data.type && data.type === 'feed') {

                                // if user specifies that they want to use the Facebook feed dialog (https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.4)
                                var urlString = 'https://www.facebook.com/dialog/feed?display=popup' +
                                    '&app_id=' + encodeURI(data.via) +
                                    '&redirect_uri=' + encodeURI(data.redirectUri);

                                if (data.url) {
                                    urlString += '&link=' + encodeURIComponent(data.url);
                                }

                                if (data.to) {
                                    urlString += '&to=' + encodeURIComponent(data.to);
                                }
                                if (data.display) {
                                    urlString += '&display=' + encodeURIComponent(data.display);
                                }

                                if (data.ref) {
                                    urlString += '&ref=' + encodeURIComponent(data.ref);
                                }

                                if (data.from) {
                                    urlString += '&from=' + encodeURIComponent(data.from);
                                }

                                if (data.description) {
                                    urlString += '&description=' + encodeURIComponent(data.description);
                                }

                                if (data.text) {
                                    urlString += '&name=' + encodeURIComponent(data.text);
                                }

                                if (data.caption) {
                                    urlString += '&caption=' + encodeURIComponent(data.caption);
                                }

                                if (data.media) {
                                    urlString += '&picture=' + encodeURIComponent(data.media);
                                }

                                if (data.source) {
                                    urlString += '&source=' + encodeURIComponent(data.source);
                                }

                                $window.open(
                                    urlString,
                                    'sharer', 'toolbar=0,status=0,width=' + data.popupWidth + ',height=' + data.popupHeight +
                                        ',top=' + popupLocation.top + ',left=' + popupLocation.left);

                            } else {

                                //otherwise default to using sharer.php
                                $window.open(
                                    'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.url || $location.absUrl())
                                    , 'sharer', 'toolbar=0,status=0,width=' + data.popupWidth + ',height=' + data.popupHeight +
                                        ',top=' + popupLocation.top + ',left=' + popupLocation.left);
                            }
                        };

                        $scope.twitterShare = function manageTwitterShare(data) {
                            var popupLocation = getPopupLocation(data.popupWidth, data.popupHeight);
                            var urlString = 'https://www.twitter.com/intent/tweet?';

                            if (data.text) {
                                urlString += 'text=' + encodeURIComponent(data.text);
                            }

                            if (data.via) {
                                urlString += '&via=' + encodeURI(data.via);
                            }

                            if (data.hashtags) {
                                urlString += '&hashtags=' + encodeURI(data.hashtags);
                            }

                            //default to the current page if a URL isn't specified
                            urlString += '&url=' + encodeURIComponent(data.url || $location.absUrl());

                            $window.open(
                                urlString,
                                'sharer', 'toolbar=0,status=0,width=' + data.popupWidth + ',height=' + data.popupHeight +
                                    ',top=' + popupLocation.top + ',left=' + popupLocation.left);


                        };

                        $scope.googlePlusShare = function manageGooglePlusShare(data) {
                            var popupLocation = getPopupLocation(data.popupWidth, data.popupHeight);

                            $window.open(
                                'https://plus.google.com/share?url=' + encodeURIComponent(data.url || $location.absUrl())
                                , 'sharer', 'toolbar=0,status=0,width=' + data.popupWidth + ',height=' + data.popupHeight +
                                    ',top=' + popupLocation.top + ',left=' + popupLocation.left);

                        };

                        $scope.redditShare = function manageRedditShare(data) {
                            var urlString = 'https://www.reddit.com/';

                            if (data.subreddit) {
                                urlString += 'r/' + data.subreddit + '/submit?url=';
                            } else {
                                urlString += 'submit?url=';
                            }

                            /*-
                             * Reddit isn't responsive and at default width for our popups (500 x 500), everything is messed up.
                             * So, overriding the width if it is less than 900 (played around to settle on this) and height if
                             * it is less than 650px.
                             */
                            if (data.popupWidth < 900) {
                                data.popupWidth = 900;
                            }

                            if (data.popupHeight < 650) {
                                data.popupHeight = 650;
                            }

                            $window.open(
                                urlString + encodeURIComponent(data.url || $location.absUrl()) + '&title=' + encodeURI(data.text)
                                , 'sharer', 'toolbar=0,status=0,width=' + data.popupWidth + ',height=' + data.popupHeight);
                        };


                        var getPopupLocation = function (w, h) {
                            var left = ($window.screen.width / 2) - (w / 2);
                            var top = ($window.screen.height / 2) - (h / 2);
                            return {top: top, left: left}

                        };

                        element.bind(properties.eventTrigger, function onEventTriggered() {

                            switch (properties.provider) {
                                case 'facebook':

                                    $scope.facebookShare(properties);
                                    break;

                                case 'google+':

                                    $scope.googlePlusShare(properties);
                                    break;

                                case 'twitter':

                                    $scope.twitterShare(properties);
                                    break;

                                default:
                                    return;
                            }
                        });
                    }
                };
            }]);
}(angular));
