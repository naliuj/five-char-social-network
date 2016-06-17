var isLoggedIn = require('./middleware/isLoggedIn');
var Post = require('../app/models/post');
var User = require('../app/models/user');

module.exports = function(app, post) {

	app.get('/user/:username', function(req, res)  {
		var username = req.params.username;
		var user_exists;
		User.findOne({ 'local.username': username }, function(err, user) {
			if (err) return console.error(err);
			if (user != null) {
				Post.find({ 'author.username': username }, function(err, posts) {
					if (err) console.error(err);
					res.render('profile.ejs', {
						req: req,
						page: 'profile',
						posts: posts,
						user: user,
						exists: true,
						message: req.flash('deleteMessage')
					});
				});
			} else {
				res.render('profile.ejs', {
					req: req,
					page: 'profile',
					posts: null,
					user: user,
					exists: false,
					message: req.flash('deleteMessage')
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
