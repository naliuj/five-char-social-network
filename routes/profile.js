var isLoggedIn = require('./middleware/isLoggedIn');
var Post = require('../app/models/post');
var User = require('../app/models/user');

module.exports = function(app, post) {
	app.get('/user/:username', function(req, res)  {
		Post.find({ 'author.username': req.params.username}, function(err, posts) {
			if (err) {
				throw err;
			} else {
				res.render('profile.ejs', {
					req: req,
					page: 'profile',
					posts: posts,
					username: req.params.username
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
