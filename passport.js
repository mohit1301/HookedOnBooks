const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/user')
const passport = require('passport')
require('dotenv').config()

const cookieExtractor = function (req) {
    let jwtToken = null;
    if (req && req.cookies) {
        jwtToken = req.cookies.accessToken;
    }
    return jwtToken;
};

const opts = {

    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.userId }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            user.isAuthenticated = true
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));
