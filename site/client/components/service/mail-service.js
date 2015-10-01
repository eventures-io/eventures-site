'use strict';


angular.module('evtrs-site').factory('MailService', function ($http, $q) {

    var sendContactForm = function (formData) {
        var deferred = $q.defer();
        $http.post('/api/contact', formData).then(function(response){
            if(response.status === 200){
                deferred.resolve('Message sent successfully');
            }else {
                deferred.reject('Error sending message');
            }
        }, function(error){
            deferred.reject('Error sending message');
        });
        return deferred.promise;
    }
    return {
        sendContactForm: sendContactForm
    };


});

