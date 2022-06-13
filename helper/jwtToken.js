const jwt = require("jsonwebtoken"),
    { JWT_PRIVATE_KEY } = process.env;

module.exports = {
    generateToken: (_id) => jwt.sign({ _id }, JWT_PRIVATE_KEY, { expiresIn: 60 * 60 * 24 }),

    verifyToken: (token) => jwt.verify(token, JWT_PRIVATE_KEY)
};
