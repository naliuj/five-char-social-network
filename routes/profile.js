var isLoggedIn = require('./middleware/isLoggedIn');
var Post = require('../app/models/post');

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

};
