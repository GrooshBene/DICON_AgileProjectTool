/**
 * Created by GrooshBene on 2016. 10. 21..
 */

module.exports = init;
function init(app, User, randomString) {
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
        clientID: "1264766676921309",
        clientSecret: "d64761ef5879fcd83e3551ad585980a6",
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
                        done(null, profile.id);
                    }
                });
            }
            else if (user) {
                done(null, profile.id);
            }
        });
    }));

    app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) {

    });
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/project/user/list',
        failureRedirect: '/onFailure'
    }));

    app.post('/auth/local/login', function (req, res) {
        console.log("User Login : " + req.param('email'));
        User.findOne({email : req.param('email')}, function (err, result) {
            console.log("DB Founded : " + result);
            if(err){
                console.log("/auth/local/login failed");
                throw err;
            }
            if(result){
                if(req.param('email') == undefined){
                    console.log("Unvalid User Infomation");
                    res.send(401, "Unvalid User Infomation");
                }
                else if(req.param('email')!= undefined && result.password == req.param('password')){
                    console.log("User " + result.name + "Logged In");
                    req.session._id = result._id;
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

    app.post('/auth/local/signin', function (req, res) {
        var user = new User({
            _id : randomString.generate(13),
            name : req.param('name'),
            email : req.param('email'),
            password : req.param('password'),
            projects : []
        });
        User.find({phone : req.param('phone')}).exec(function (err, result) {
            if(err){
                console.log('/auth/local/signin DB Error');
                throw err;
            }
            if(result.length != 0){
                console.log("User Data Exists!");
                res.send(401, "User Data Exists!");
            }
            else if(result.length == 0){
                user.save(function (err) {
                    if(err){
                        console.log("/auth/signin Failed");
                        throw err;
                    }
                    else {
                        console.log("user register : " + user);
                        res.send(200, response);
                    }
                })
            }
        })
    });

    app.post('/user/info', function (req, res) {
        User.findOne({_id : req.session._id}).exec(function (err, result) {
            if(err){
                console.log('/user/info DB Error!');
                throw err;
            }
            else{
                console.log("User Founded : "+ result);
                res.send(200, result);
            }
        })
    })
    //function end
}
