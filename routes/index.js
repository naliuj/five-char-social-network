var Post = require('../app/models/post');
var User = require('../app/models/user');
var isLoggedIn = require('./middleware/isLoggedIn');
var isAdmin = require('./middleware/isAdmin');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		if (req.isAuthenticated() && (req.user.local.username == null || req.user.local == {})) {
			res.redirect('/finish_signup');
		} else {
			loadPosts(req, function(err, posts) {
				if (err) console.error(err);
				res.render('index.ejs', {
					req: req,
					page: 'index',
					message: req.flash('submitMessage'),
					posts: posts
				});
			});
		};
	});

	app.post('/', function(req, res) {
		var submission = req.body.submission;
		// make sure that the submission is exactly 5 characters long
		if (submission.trim().length == 5) {
			var post = new Post({
				body: submission,
				author: {
					username: req.user.local.username,
					id: req.user._id
				},
				date: new Date
			});
			// save the submission to the database
			post.save(function(err) {
				if (err) {
					req.flash('submitMessage',
						'Something went wrong trying to save your post.');
					console.error(err);
				} else {
					req.flash('submitMessage', 'Your post has been saved!');
				};
			});
		};
		res.redirect('/');
	});
};

function loadPosts(req, callback) {
	// if (req.isAuthenticated()) {
		// load posts by people the user follows
	// } else {
		// load all posts
		Post.find({}).sort('-date').exec(function(err, post) {
			if (err) {
				return console.error(err);
				callback(err);
			} else {
				callback(null, post);
			};
		});
	// };

};
