const createError = require("http-errors"),
    { Product } = require("../models/product");

module.exports = {
    addProduct: async (req, res) => {
        const product = await new Product({ ...req.body, Seller: req.seller._id }).save();

        res.status(201).send(product);
    },

    getProduct: async (req, res) => {
        const product = await Product.findOne({ _id: req.params.productId, Seller: req.seller._id });
        if (!product) throw createError(404, "product not found");

        res.send(product);
    },

    getAllProduct: async (req, res) => {
        const products = await Product.find().populate("Seller", "-_id");
        if (Array.isArray(products) && !products.length) throw createError(404, "products not found.");

        res.send(products);
    },

    getAllProductBySeller: async (req, res) => {
        const products = await Product.find({ Seller: req.seller._id });
        if (Array.isArray(products) && !products.length) throw createError(404, "products not found.");

        res.send(products);
    },

    updateProduct: async (req, res) => {
        const product = await Product.findOneAndUpdate({ _id: req.params.productId, Seller: req.seller._id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) throw createError(404, "product not found.");

        res.send(product);
    },

    removeProduct: async (req, res) => {
        const product = await Product.findOneAndRemove({ _id: req.params.productId, Seller: req.seller._id });
        if (!product) throw createError(404, "product not found.");

        res.send(product);
    }
};
