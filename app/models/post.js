var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({

	body: String,
	author: {
		username: String,
		id: String
	},
	likes: [String],
	comments: [String],
	date: Date

});

module.exports = mongoose.model('Post', postSchema);