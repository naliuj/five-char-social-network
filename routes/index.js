var Post = require('../app/models/post');
var User = require('../app/models/user');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		loadPosts(req, function(err, posts) {
			if (err) console.error(err);
			res.render('index.ejs', { 
				req: req,
				page: 'index',
				message: req.flash('submitMessage'),
				posts: posts
			});
		});
	});

	app.post('/', function(req, res) {
		var submission = req.body.submission;
		// make sure that the submission is exactly 5 characters long
		if (submission.trim().length == 5) {
			var post = new Post({
				body: submission,
				author: req.user.local.username,
				date: new Date
			});
			// save the submission to the database
			post.save(function(err) {
				if (err) {
					console.log("Something went wrong trying to save post.");
				} else {
					console.log("Saved post:", submission);
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