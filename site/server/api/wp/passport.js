var passport = require('passport');
var WordpressStrategy = require('passport-wordpress').Strategy;

exports.setup = function (config) {

    passport.use(new WordpressStrategy({
            clientID:  process.env.WP_CLIENT_ID,
            clientSecret: process.env.WP_CLIENT_SECRET,
            authorizationURL : config.WP_AUTH_URL
        },
    function(accessToken, refreshToken, profile, done) {

           var user = {WordpressId: profile.id }
           return done(err, user);

        }
    ));

};
