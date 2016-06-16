var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({

	local: {
		username: { type: String, unique: true },
		email: String,
		password: String
	},

	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},

	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String
	},

	meta: {
		posts: [String],
		comments: [String],
		likes: [String],
		following: [String],
		followers: [String]
	},

	role: String

});

// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
	try {
		return bcrypt.compareSync(password, this.local.password);
	}
	catch(err) {
		return false;
	}
};

module.exports = mongoose.model('User', userSchema);
