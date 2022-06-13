const { errors } = require("../debugging/debug");

module.exports = (err, req, res, next) => {
    errors(err.name, err.code, err.status);

    let error = {};

    if (err.name === "JsonWebTokenError") {
        err.status = 403;
        error["token"] = "Invalid token provided. Access denied.";
    }

    if (err.name === "ValidationError") {
        err.status = 400;

        for (let key in err.errors) {
            error[key] = err.errors[key]["properties"]?.message;
        }
    }

    if (err.code === 11000) {
        err.status = 400;
        error["email"] = "this email is already registerd.";
    }

    if (Object.keys(error).length === 0) {
        error[err.name] = err.message;
    }

    res.status(err.status || 500).send({ error, status_code: err.status });
};
