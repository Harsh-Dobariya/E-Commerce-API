const createError = require("http-errors"),
    passport = require("passport");

module.exports.authenticate = (role) => {
    return (req, res, next) => {
        passport.authenticate(role, (err, data) => {
            if (err) return next(err);

            if (!data) throw createError(401, "Unauthorized Access - No Token Provided!");
            req[role] = data;

            next();
        })(req, res, next);
    };
};
