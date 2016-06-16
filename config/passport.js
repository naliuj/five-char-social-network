var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

	// serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({

    	usernameField: 'username',
    	passwordField: 'password',
    	passReqToCallback: true
    },
    function(req, username, password, done) {

    	process.nextTick(function() {

    		// find a user whose username is the same as the one in the form
    		// checking to see if the user already exists basically
    		User.findOne({ 'local.username': username }, function(err, user) {

    			// if there is an error, return the error
    			if (err) return done(err);

    			// check to see if a user already exists with the same username
    			if (user) {
    				return done(null, false, req.flash('signupMessage', 'That username is taken.'));
    			} else {

    				// if the user doesn't exist yet, then create the user
    				var newUser = new User();

    				// set the user's local credentials
    				newUser.local.username = username;
    				newUser.local.password = newUser.generateHash(password);
					newUser.role = 'user';

    				// save the user
    				newUser.save(function(err) {
    					if (err) throw err;
    					return done(null, newUser);
    				});

    			}
    		});

    	});

    }));

    // =========================================================================
    // LOCAL LOGJN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({

    	usernameField: 'username',
    	passwordField: 'password',
    	passReqToCallback: true
    },
    function(req, username, password, done) {

    	// find a user whose username matches the one in the form
    	User.findOne({ 'local.username': username }, function(err, user) {
    		// if there's an error, return it
    		if (err) return done(err);

    		// check if the user exists
    		if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));

    		// check if the password is valid
    		if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong password!'));

    		// if the user is all good then return it
    		return done(null, user);
    	});

    }));

    // =========================================================================
    // TWITTER SIGNUP ==========================================================
    // =========================================================================

    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {

        process.nextTick(function() {

            // check the database to see if the user already exists
            User.findOne({ 'twitter.id': profile.id }, function(err, user) {

                // return error
                if (err) return done(err);

                // check if the user exists
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    // set all the user data we need
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
					newUser.role = 'user';

                    // save the user to the database
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });

                };

            });

        });

    }));

};
