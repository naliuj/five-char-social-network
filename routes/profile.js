var isLoggedIn = require('./middleware/isLoggedIn');

module.exports = function(app, post) {

	app.get('/profile', isLoggedIn, function(req, res)  {
		res.render('profile.ejs', {
			user: req.user
		});
	});

};