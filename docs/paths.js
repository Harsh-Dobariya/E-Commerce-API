const user = require("./routes/user"),
    seller = require("./routes/seller"),
    admin = require("./routes/admin");

module.exports = {
    paths: {
        ...user,
        ...seller,
        ...admin
    }
};
