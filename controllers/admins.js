const createError = require("http-errors"),
    bcrypt = require("bcrypt"),
    { sendVerificationEmail, sendResetPasswordEmail, sendConfirmationEmail } = require("../service/sendMail"),
    { generateToken, verifyToken } = require("../helper/jwtToken"),
    { Admin } = require("../models/admin");

module.exports = {
    registerAdmin: async (req, res) => {
        const admin = await new Admin(req.body).save(),
            token = generateToken(admin._id),
            link = `${process.env.BASE_URL}/admins/verify/${token}`;

        sendVerificationEmail(admin, link);

        res.status(201).send({ message: `A verification email has been sent to ${admin.email}.` });
    },

    loginAdmin: async (req, res) => {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) throw createError(401, "Unable to login. Please register first.");

        const isMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!isMatch) throw createError(401, "Invalid email or password provided.");
        if (!admin.isVerified) throw createError(401, "Your account has not been verified.");

        res.send({ admin, "x-admin-token": generateToken(admin._id) });
    },

    getAdmin: (req, res) => {
        res.send(req.admin);
    },

    updateAdmin: async (req, res) => {
        const key = Object.keys(req.body);

        key.forEach((key) => (req.admin[key] = req.body[key]));
        await req.admin.save();

        res.send(req.admin);
    },

    removeAdmin: async (req, res) => {
        await req.admin.remove();

        res.send(req.admin);
    },

    verify: async (req, res) => {
        if (!req.params.token) throw createError(401, "Unauthorized Access - No Token Provided!");

        const decoded = verifyToken(req.params.token);
        const admin = await Admin.findByIdAndUpdate(decoded._id, { isVerified: true }, { new: true });
        if (!admin) throw createError(404, "Unable to find admin with this token. Please register again.");

        res.send({ message: "The account has been verified. Please log in." });
    },

    resendToken: async (req, res) => {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) throw createError(404, "Unable to find admin with this email.");
        if (admin.isVerified) throw createError(400, "This account has already been verified. Please log in.");

        const token = generateToken(admin._id);
        const link = `${process.env.BASE_URL}/admins/verify/${token}`;

        sendVerificationEmail(admin, link);

        res.send({ message: `A verification email has been sent to ${admin.email}.` });
    },

    forgetPassword: async (req, res) => {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) throw createError(404, "Unable to find admin with this email.");

        const token = generateToken(admin._id);
        const link = `${process.env.BASE_URL}/admins/reset/${token}`;

        sendResetPasswordEmail(admin, link);

        res.send({ message: `A reset password link send to your registerd email ${admin.email}.` });
    },

    resetPassword: async (req, res) => {
        if (!req.params.token) throw createError(400, "Unauthorized Access - No Token Provided!");

        const decoded = verifyToken(req.params.token);
        const admin = await Admin.findById(decoded._id);

        admin.password = req.body.password;
        admin.isVerified = true;

        await admin.save();
        sendConfirmationEmail(admin);

        res.send({ message: "Your password has been updated." });
    }
};
