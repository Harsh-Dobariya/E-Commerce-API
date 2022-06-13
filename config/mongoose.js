const { info, mongooseDebug } = require("../debugging/debug"),
    mongoose = require("mongoose"),
    { PORT, MONGODB_URL } = process.env;

module.exports = (app) => {
    mongoose
        .connect(MONGODB_URL)
        .then(() => {
            mongooseDebug(`Server connected to MongoDB...`);

            app.listen(PORT, () => info(`Server is running on...http://localhost:${PORT}`));
        })
        .catch(() => mongooseDebug(`Server is not connected to MongoDB...`));
};
