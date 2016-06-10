var notLoggedIn = require('./middleware/notLoggedIn');

module.exports = function(app, passport) {

	app.get('/signup', notLoggedIn, function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', notLoggedIn, passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

};