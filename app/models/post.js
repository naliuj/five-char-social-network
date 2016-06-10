var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({

	body: String,
	author: String,
	likes: [String],
	comments: [String],
	date: Date

});

module.exports = mongoose.model('Post', postSchema);