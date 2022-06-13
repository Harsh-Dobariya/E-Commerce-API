const mongoose = require("mongoose"),
    validator = require("validator");

const cartSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: [true, "quantity must be required"],
            validate: [(v) => validator.isInt(v.toString(), { min: 0 }), "please enter valid quantity"]
        }
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
