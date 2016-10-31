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

    app.post('/auth/local/login', function (req, res) {
        console.log("User Login : " + req.param('email'));
        User.findOne({email : req.param('email')}, function (err, result) {
            console.log("DB Founded : " + result);
            if(err){
                console.log("/auth/local/login failed");
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
                throw err;
            }
            if(result){
                if(req.param('email') == undefined){
                    console.log("Unvalid User Infomation");
                    res.send(401, "Unvalid User Infomation");
                }
                else if(req.param('email')!= undefined && result.password == req.param('password')){
                    console.log("User " + result.name + "Logged In");
                    req.session.user_id = result._id;
                    res.send(200, sign);
                }
                else if(result.password != req.param('password')){
                    console.log("Password Error!");
                    res.send(400, "Access Denied");
                }
            }
            else {
                console.log("Can't Find User Data");
                res.send(400, "Can't Find User Data!");
            }
        });
    });
    //function end
}