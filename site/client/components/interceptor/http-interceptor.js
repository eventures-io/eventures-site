'use strict';
angular.module('evtrs-site').
    factory('HttpRequestInterceptor', function ($rootScope, $q, $log) {

        return {
            request: function (config) {
                config.timeout = 6000;
                return config || $q.when(config)
            },
            responseError: function (response) {

                if (response.status !== 401 && response.status !== 404 && response.status !== 403) {
                    $rootScope.$broadcast('NETWORK_ERROR', {
                            title: response.status ? response.status : 'NETWORK ERROR',
                            message: response.statusText ? response.statusText : 'COULD NOT CONNECT'
                        }
                    );
                } else {
                   $log.error('server-error', JSON.stringify(response));
                }
                return $q.reject(response);
            }
        };
    });