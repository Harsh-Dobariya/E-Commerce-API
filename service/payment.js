const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY),
    { Cart } = require("../models/cart");

module.exports.makePayment = async (req, res) => {
    const carts = await Cart.find({ User: req.user._id }).populate("Product");

    const line_items = carts.map(({ quantity, Product }) => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: Product.product_name,
                    images: [Product.profileImage]
                },
                unit_amount: Product.price * 118
            },
            description: Product.description,
            quantity
        };
    });

    let session = stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.BASE_URL}/api-docs`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    });

    let cart = Cart.deleteMany({ User: req.user._id });

    [session, cart] = await Promise.all([session, cart]);

    res.send({ payment_url: session.url });
};
