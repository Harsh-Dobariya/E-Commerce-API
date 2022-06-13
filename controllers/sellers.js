const createError = require("http-errors"),
    bcrypt = require("bcrypt"),
    { sendVerificationEmail, sendResetPasswordEmail, sendConfirmationEmail } = require("../service/sendMail"),
    { generateToken, verifyToken } = require("../helper/jwtToken"),
    { Seller } = require("../models/seller"),
    { Product } = require("../models/product");

module.exports = {
    registerSeller: async (req, res) => {
        const seller = await new Seller(req.body).save(),
            token = generateToken(seller._id),
            link = `${process.env.BASE_URL}/sellers/verify/${token}`;

        sendVerificationEmail(seller, link);

        res.status(201).send({ message: `A verification email has been sent to ${seller.email}.` });
    },

    loginSeller: async (req, res) => {
        const seller = await Seller.findOne({ email: req.body.email });
        if (!seller) throw createError(401, "Unable to login. Please register first.");

        const isMatch = await bcrypt.compare(req.body.password, seller.password);
        if (!isMatch) throw createError(401, "Invalid email or password provided.");
        if (!seller.isVerified) throw createError(401, "Your account has not been verified.");

        res.send({ seller, "x-seller-token": generateToken(seller._id) });
    },

    getSeller: (req, res) => {
        res.send(req.seller);
    },

    getAllSeller: async (req, res) => {
        const sellers = await Seller.find();
        if (Array.isArray(sellers) && !sellers.length) throw createError(404, "sellers not found.");

        res.send(sellers);
    },

    updateSeller: async (req, res) => {
        const key = Object.keys(req.body);

        key.forEach((key) => (req.seller[key] = req.body[key]));
        await req.seller.save();

        res.send(req.seller);
    },

    removeSeller: async (req, res) => {
        const p1 = req.seller.remove();
        const p2 = Product.deleteMany({ Seller: req.seller._id });

        const [seller, product] = await Promise.all([p1, p2]);

        res.send({ seller, product });
    },

    removeSellerByAdmin: async (req, res) => {
        const p1 = Seller.findByIdAndRemove(req.params.sellerId);
        const p2 = Product.deleteMany({ Seller: req.params.sellerId });

        const [seller, product] = await Promise.all([p1, p2]);
        if (!seller) throw createError(404, "seller not found.");

        res.send({ seller, product });
    },

    verify: async (req, res) => {
        if (!req.params.token) throw createError(401, "Unauthorized Access - No Token Provided!");

        const decoded = verifyToken(req.params.token);

        const seller = await Seller.findByIdAndUpdate(decoded._id, { isVerified: true }, { new: true });
        if (!seller) throw createError(404, "Unable to find seller with this token. Please register again.");

        res.send({ message: "The account has been verified. Please log in." });
    },

    resendToken: async (req, res) => {
        const { email } = req.body;

        const seller = await Seller.findOne({ email });
        if (!seller) throw createError(404, "Unable to find seller with this email.");
        if (seller.isVerified) throw createError(400, "This account has already been verified. Please log in.");

        const token = generateToken(seller._id);
        const link = `${process.env.BASE_URL}/sellers/verify/${token}`;

        sendVerificationEmail(seller, link);

        res.send({ message: `A verification email has been sent to ${seller.email}.` });
    },

    forgetPassword: async (req, res) => {
        const { email } = req.body;

        const seller = await Seller.findOne({ email });
        if (!seller) throw createError(404, "Unable to find seller with this email.");

        const token = generateToken(seller._id);
        const link = `${process.env.BASE_URL}/sellers/reset/${token}`;

        sendResetPasswordEmail(seller, link);

        res.send({ message: `A reset password link send to your registerd email ${seller.email}.` });
    },

    resetPassword: async (req, res) => {
        if (!req.params.token) throw createError(400, "Unauthorized Access - No Token Provided!");

        const decoded = verifyToken(req.params.token);
        const seller = await Seller.findById(decoded._id);

        seller.password = req.body.password;
        seller.isVerified = true;

        await seller.save();
        sendConfirmationEmail(seller);

        res.send({ message: "Your password has been updated." });
    }
};
