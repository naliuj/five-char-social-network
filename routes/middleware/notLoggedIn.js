module.exports = function(req, res, next) {

	// if the user isn't authenticated
	if (!req.isAuthenticated())
		return next();

	// if they are, redirect them to the home page
	res.redirect('/');

};