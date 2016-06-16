var isLoggedIn = require('./middleware/isLoggedIn');
var Post = require('../app/models/post');
var User = require('../app/models/user');

module.exports = function(app, post) {
	app.get('/user/:username', function(req, res)  {
		var username = req.params.username;
		var user_exists;
		User.findOne({ 'local.username': username }, function(err, user) {
			if (err) throw err;
			if (user != null) {
				Post.find({ 'author.username': username }, function(err, posts) {
					res.render('profile.ejs', {
						req: req,
						page: 'profile',
						posts: posts,
						username: username,
						exists: true
					});
				});
			} else {
				res.render('profile.ejs', {
					req: req,
					page: 'profile',
					posts: null,
					username: username,
					exists: false
				});
			};
		});
	});

	app.get('/user', function(req, res) {
		User.find({}, function(err, users) {
			if (err) {
				throw err;
			} else {
				res.render('users.ejs', {
					req: req,
					page: 'users',
					users: users
				});
			};
		}).sort({ 'local.username': 'ascending' });
	});

	app.get('/users', function(req, res) {
		res.redirect('/user');
	});

};
