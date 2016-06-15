var isLoggedIn = require('./middleware/isLoggedIn');
var User = require('../app/models/user');

module.exports = function(app, passport) {

    app.get('/settings', isLoggedIn, function(req, res) {
        if (req.flash('passMessage') != (0 || 1)) {
            req.flash('passMessage', 2);
        };
        res.render('settings.ejs', {
            page: 'settings',
            req: req,
        });
    });

    app.post('/settings', function(req, res) {
        var id = req.user._id;
        console.log('User id: ', id);
        User.findById(id, function(err, account) {
            if (err) {
                throw err;
            } else {
                if (!account.validPassword(req.body.oldpass)) {
                    console.log('Invalid old password for: ', req.user.local.username);
                    req.flash('passChange', 0);
                    req.flash('passMessage', 'Invalid old password!')
                } else {
                    account.local.password = account.generateHash(req.body.newpass);
                    account.save(function(err) {
                        if (err) {
                            console.error(err);
                            req.flash('passChange', 0);
                            req.flash('passMessage',
                            'Something went wrong trying to change your password. Try again in a bit.');
                        } else {
                            console.log('Password changed for user:', req.user.local.username);
                            req.flash('passChange', 1);
                            req.flash('passMessage', 'Password changed successfully!')
                        };
                    });
                };
            };
        });
        res.redirect('/settings');
    });

};
