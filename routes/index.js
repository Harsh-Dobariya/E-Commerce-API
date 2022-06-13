const express = require("express"),
    basicAuth = require("express-basic-auth"),
    swaggerUI = require("swagger-ui-express"),
    docs = require("../docs"),
    { USER1, PASS1 } = process.env;

module.exports = (app) => {
    app.use(require("cors")());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(require("passport").initialize());
    app.use(
        "/api-docs",
        basicAuth({
            users: { [USER1]: PASS1 },
            challenge: true
        }),
        swaggerUI.serve,
        swaggerUI.setup(docs)
    );
    app.use("/users", require("./users.routes"));
    app.use("/sellers", require("./seller.routes"));
    app.use("/admins", require("./admin.routes"));
    app.use(require("../middleware/errors"));
    app.use("*", (req, res) => {
        res.send("Payment error occur");
    });
};
