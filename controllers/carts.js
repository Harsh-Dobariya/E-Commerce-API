const createError = require("http-errors"),
    { Product } = require("../models/product"),
    { Cart } = require("../models/cart");

module.exports = {
    addProductInCart: async (req, res) => {
        let product = Product.findById(req.params.productId).select("quantity");
        let cart = Cart.findOne({ Product: req.params.productId });

        [cart, product] = await Promise.all([cart, product]);
        if (product.quantity < req.body.quantity) throw createError(400, "Quantity not available.");

        if (cart) {
            cart.quantity += req.body.quantity;
            product.quantity -= req.body.quantity;

            [cart, product] = await Promise.all([cart.save(), product.save()]);
            cart = await cart.populate([{ path: "User" }, { path: "Product" }]);

            return res.send(cart);
        }

        cart = new Cart({
            User: req.user._id,
            Product: req.params.productId,
            quantity: req.body.quantity
        });

        product.quantity -= req.body.quantity;

        [cart, product] = await Promise.all([cart.save(), product.save()]);
        cart = await cart.populate([{ path: "User" }, { path: "Product" }]);

        res.status(201).send(cart);
    },

    updateInCart: async (req, res) => {
        const cart = await Cart.findOneAndUpdate({ Product: req.params.productId }, req.body, {
            runValidators: true,
            new: true
        }).populate([{ path: "User" }, { path: "Product" }]);
        if (!cart) throw createError(404, "Your cart looks like empty. No product found");

        res.send(cart);
    },

    getCartProduct: async (req, res) => {
        const carts = await Cart.find({ User: req.user._id }).populate("Product");
        if (Array.isArray(carts) && !carts.length) throw createError(404, "Your cart looks like empty. No product found");

        res.send(carts);
    },

    removeProductInCart: async (req, res) => {
        let cart = Cart.findOneAndRemove({ Product: req.params.productId }).populate([
            { path: "User" },
            { path: "Product" }
        ]);

        let product = Product.findByIdAndUpdate(
            req.params.productId,
            { $inc: { quantity: cart.quantity } },
            { new: true, runValidators: true }
        );

        [cart, product] = await Promise.all([cart, product]);
        if (!cart) throw createError(404, "Product not found in cart");

        res.send(cart);
    }
};
