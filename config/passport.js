const { Strategy, ExtractJwt } = require("passport-jwt"),
    { User } = require("../models/user"),
    { Seller } = require("../models/seller"),
    { Admin } = require("../models/admin"),
    passport = require("passport"),
    options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_PRIVATE_KEY
    };

passport.use(
    "user",
    new Strategy(options, (decoded, done) => {
        User.findById(decoded._id)
            .then((user) => {
                if (!user) return done(null, false);
                done(null, user);
            })
            .catch((err) => done(err));
    })
);

passport.use(
    "seller",
    new Strategy(options, (decoded, done) => {
        Seller.findById(decoded._id)
            .then((seller) => {
                if (!seller) return done(null, false);
                done(null, seller);
            })
            .catch((err) => done(err));
    })
);

passport.use(
    "admin",
    new Strategy(options, (decoded, done) => {
        Admin.findById(decoded._id)
            .then((admin) => {
                if (!admin) return done(null, false);
                done(null, admin);
            })
            .catch((err) => done(err));
    })
);
