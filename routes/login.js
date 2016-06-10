var notLoggedIn = require('./middleware/notLoggedIn');

module.exports = function(app, passport) {

	app.get('/login', notLoggedIn, function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', notLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));
};