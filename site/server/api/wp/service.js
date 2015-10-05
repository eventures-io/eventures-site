'use strict';

exports.likes = function(req, res) {
     var token  = authorize();
        //use https://github.com/request/request to make the request
}

exports.addLike = function(req, res) {

}


var authorize = function() {
    passport.authorize('wordpress', { failureRedirect: '/error' }),
        function(req, res) {
            // Successful authentication, redirect home.
            //res.redirect('/');
            console.info('authentication successful');
            //getToken from response?
            //return ;//?
        };

}