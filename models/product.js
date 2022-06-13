const mongoose = require("mongoose"),
    validator = require("validator");

const productSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            default: "https://avatars.githubusercontent.com/u/99234851"
        },
        product_name: {
            type: String,
            trim: true,
            required: [true, "product_name must be required"],
            validate: [(v) => validator.matches(v, /^[a-z|\s]+$/gi), "please enter valid product_name"]
        },
        price: {
            type: Number,
            min: 0,
            required: [true, "price must be required"],
            validate: [(v) => validator.isNumeric(v.toString()), "please enter valid price"]
        },
        description: {
            type: String,
            trim: true,
            required: [true, "description must be required"],
            validate: [(v) => validator.isAscii(v), "please enter valid description"]
        },
        quantity: {
            type: Number,
            min: 0,
            required: [true, "quantity must be required"],
            validate: [(v) => validator.isInt(v.toString(), { min: 0 }), "please enter valid quantity"]
        },
        Seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "sellerId must be required"],
            ref: "Seller"
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
