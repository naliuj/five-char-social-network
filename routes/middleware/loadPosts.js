module.exports = function(req, Post) {

	if (req.isAuthenticated()) {
		// load posts by people the user follows
	} else {
		// load all posts
		Post.find({}, function(err, post) {
			if (err) {
				return console.error(err);
			} else {
				return post;
			};
		});
	};

};