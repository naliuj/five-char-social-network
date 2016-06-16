module.exports = function(req, res, next) {

    // check to see if the user is authenticated and if their role is "admin"
    if (req.isAuthenticated() && req.user.role == "admin")
        return next();

    // if they aren't, redirect the user to the home page
    res.redirect('/');

};
