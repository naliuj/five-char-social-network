module.exports = function(req, res, next) {

	// if user is authenticated
	if (req.isAuthenticated())
		return next();

	// if they aren't, redirect them to the home page
	res.redirect('/');

};