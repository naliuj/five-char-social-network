var isAdmin = require('./middleware/isAdmin');
var isDev = require('./middleware/isDev');
var User = require('../app/models/user');
var Post = require('../app/models/post')

module.exports = function(app, passport) {

    // Route for locking users
    app.post('/lock', isAdmin, function(req, res) {
        // Find the user
        User.findById(req.body.lock, function(err, user) {
            if (err) return console.error(err);
            // Lock the user
            user.locked = true;
            // Save the changes
            user.save(function(err) {
                if (err) return console.error(err);
            });
        });
        res.redirect('back');
    });

    // Route for unlocking users
    app.post('/unlock', isAdmin, function(req, res) {
        // Find the user
        User.findById(req.body.unlock, function(err, user) {
            if (err) return console.error(err);
            // Unlock the user
            user.locked = false;
            // Save the changes
            user.save(function(err) {
                if (err) return console.error(err);
            });
        });
        res.redirect('back');
    });

    app.post('/delete_user', isAdmin, function(req, res) {
        // Delete the user's account
        User.remove({ _id: req.body.delete }, function(err) {
            if (err) {
                req.flash('deleteMessage',
                'Something went wrong trying to delete the account.');
                res.redirect('back');
            } else {
                // Delete all the posts associated with the user's account
                Post.remove({ 'author.id': req.body.delete }, function(err) {
                    if (err) {
                        console.error(err);
                    };
                    res.redirect('/');
                });
            };
        });
    });

    // Route for displaying the user request info
    app.get('/userreq', isDev, function(req, res) {
        res.send(req.user);
    });


};
