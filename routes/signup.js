var notLoggedIn = require('./middleware/notLoggedIn');
var isLoggedIn = require('./middleware/isLoggedIn');
var User = require('../app/models/user');

module.exports = function(app, passport) {

	app.get('/signup', notLoggedIn, function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', notLoggedIn, passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/finish_signup',
			failureRedirect: '/'
		}));

	app.get('/finish_signup', function(req, res) {
		if (req.isAuthenticated()) {
			if (req.user.local != {} && req.user.local.username != null) {
				res.redirect('/');
			} else {
				res.render('finish_signup.ejs', {
					page: "finish-signup",
					req: req,
					message: req.flash('username-message')
				});
			};
		} else {
			res.redirect('/');
		};
	});

	app.post('/finish_signup', function(req, res) {
		User.findOne({"local.username": req.body.username}, function(err, doc) {
			if (err) return console.error(err);
			if (doc == null) {
				User.findOneAndUpdate({"twitter.id" : req.user.twitter.id},
					{$set: {"local.username": req.body.username}}, {new: true},
					function(err, doc) {
						if (err) {
							return console.error(err);
						} else {
							res.redirect('/');
						};
					}
				);
			} else {
				req.flash('username-message', 'Username is already taken!');
				res.redirect('/finish_signup');
			};
		});
	});

};
