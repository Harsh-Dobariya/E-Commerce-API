const debug = require("debug");

const info = debug("info"),
    errors = debug("error"),
    mongooseDebug = debug("mongoose"),
    email = debug("email");

module.exports = { info, errors, mongooseDebug, email };
