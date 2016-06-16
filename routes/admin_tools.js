var isAdmin = require('./middleware/isAdmin');
var User = require('../app/models/user');

module.exports = function(app, passport) {

    // Route for locking users
    app.post('/lock', isAdmin, function(req, res) {
        // Find the user
        User.findById(req.body.lock, function(err, user) {
            if (err) return console.error(err);
            user.locked = true;
            user.save(function(err) {
                if (err) return console.error(err);
            });
        });
        res.redirect('back');
    });

};
