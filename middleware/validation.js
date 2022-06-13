const createError = require("http-errors"),
    validator = require("validator");

module.exports = {
    validEmail: (req, res, next) => {
        if (!validator.isEmail(req.body.email)) throw createError(400, "Invalid email-id provided.");
        next();
    },

    validId: (req, res, next) => {
        const { userId, productId, sellerId } = req.params;

        if (!validator.isMongoId(userId || productId || sellerId)) throw createError(400, "Invalid mongoDB id provided.");
        next();
    },

    validChange: async (req, res, next) => {
        if (req.body.password) {
            if (!req.body.oldPassword) throw createError(400, "oldPassword required to change password.");

            const password = req.user.password || req.seller.password || req.admin.password;
            const isMatch = await bcrypt.compare(req.body.oldPassword, password);
            if (!isMatch) throw createError(400, "Invalid password provided.");
        }

        next();
    }
};
