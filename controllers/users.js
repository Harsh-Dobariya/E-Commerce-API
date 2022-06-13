const createError = require("http-errors"),
    bcrypt = require("bcrypt"),
    { sendVerificationEmail, sendResetPasswordEmail, sendConfirmationEmail } = require("../service/sendMail"),
    { generateToken, verifyToken } = require("../helper/jwtToken"),
    { User } = require("../models/user");

module.exports = {
    registerUser: async (req, res) => {
        const user = await new User(req.body).save(),
            token = generateToken(user._id),
            link = `${process.env.BASE_URL}/users/verify/${token}`;

        sendVerificationEmail(user, link);

        res.status(201).send({ message: `A verification email has been sent to ${user.email}.` });
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw createError(400, "Unable to login. Please register first.");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) throw createError(400, "Invalid email or password provided.");
        if (!user.isVerified) throw createError(400, "Your account has not been verified.");

        res.send({ user, "x-user-token": generateToken(user._id) });
    },

    getUser: (req, res) => {
        res.send(req.user);
    },

    getAllUser: async (req, res) => {
        const users = await User.find();
        if (Array.isArray(users) && !users.length) throw createError(404, "users not found.");

        res.send(users);
    },

    updateUser: async (req, res) => {
        const key = Object.keys(req.body);

        key.forEach((key) => (req.user[key] = req.body[key]));
        await req.user.save();

        res.send(req.user);
    },

    removeUser: async (req, res) => {
        await req.user.remove();

        res.send(req.user);
    },

    removeUserByAdmin: async (req, res) => {
        const user = await User.findByIdAndRemove(req.params.userId);
        if (!user) throw createError(404, "user not found.");

        res.send(user);
    },

    verify: async (req, res) => {
        if (!req.params.token) throw createError(401, "Unauthorized Access - No Token Provided!");

        const decoded = verifyToken(req.params.token);
        const user = await User.findByIdAndUpdate(decoded._id, { isVerified: true }, { new: true });
        if (!user) throw createError(404, "Unable to find user with this token. Please register again.");

        res.send({ message: "The account has been verified. Please log in." });
    },

    resendToken: async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw createError(404, "Unable to find user with this email.");
        if (user.isVerified) throw createError(400, "This account has already been verified. Please log in.");

        const token = generateToken(user._id);
        const link = `${process.env.BASE_URL}/users/verify/${token}`;

        sendVerificationEmail(user, link);

        res.send({ message: `A verification email has been sent to ${user.email}.` });
    },

    forgetPassword: async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw createError(404, "Unable to find user with this email.");

        const token = generateToken(user._id);
        const link = `${process.env.BASE_URL}/users/reset/${token}`;

        sendResetPasswordEmail(user, link);

        res.send({ message: `A reset password link send to your registerd email ${user.email}.` });
    },

    resetPassword: async (req, res) => {
        if (!req.params.token) throw createError(401, "Unauthorized Access - No Token Provided!");

        const decoded = verifyToken(req.params.token);
        const user = await User.findById(decoded._id);

        user.password = req.body.password;
        user.isVerified = true;

        await user.save();
        sendConfirmationEmail(user);

        res.send({ message: "Your password has been updated." });
    }
};
