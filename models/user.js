const _ = require("lodash"),
    mongoose = require("mongoose"),
    validator = require("validator"),
    bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            default: "https://avatars.githubusercontent.com/u/99234851"
        },
        name: {
            type: String,
            trim: true,
            required: [true, "name must be required"],
            validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "please enter valid name"]
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "email must be required"],
            validate: [(v) => validator.isEmail(v), "please enter valid email"]
        },
        password: {
            type: String,
            trim: true,
            required: [true, "password must be required"],
            validate: [(v) => validator.isLength(v, { min: 6 }), "password should be more than 6 characters"]
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    return _.omit(this._doc, ["password", "isVerified", "__v"]);
};

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24
    });
    return token;
};

userSchema.pre("save", async function (next) {
    this.isModified("password") && (this.password = await bcrypt.hash(this.password, 10));
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
