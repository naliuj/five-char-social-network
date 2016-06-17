module.exports = function(req, res, next) {

    // Check to see if the user is authenticated and a dev
    if (req.isAuthenticated() && req.user.role == "dev")
        return next();

    // If they aren't redirect them
    res.redirect('/');

};
