var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({

	body: String,
	author: {
		username: String,
		id: String
	},
	parent: Number,
	date: Date

});

module.exports = mongoose.model('Comment', commentSchema);