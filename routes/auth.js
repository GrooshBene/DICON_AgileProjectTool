/**
 * Created by GrooshBene on 2016. 10. 21..
 */

module.exports = init;
function init(app, User) {
    var passport = require('passport');

    app.use(passport.initialize());
    app.use(passport.session());

    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({
            _id: profile.id
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    _id: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                    profile: profile.profile,
                    password: "",
                    project : []
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    else {
                        done(null, profile);
                    }
                });
            }
            else if (user) {
                done(null, profile);
            }
        });
    }));

    app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) {
        console.log(req.session);
    });
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/onSuccess',
        failureRedirect: '/onFailure'
    }));
    //function end
}
