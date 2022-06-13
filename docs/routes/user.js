const registerUser = require("./method/register")("User"),
    loginUser = require("./method/login")("User"),
    getUser = require("./method/get")("User"),
    updateUser = require("./method/update")("User"),
    removeUser = require("./method/remove")("User"),
    resendToken = require("./method/resendToken")("User"),
    verify = require("./method/verify")("User"),
    forgetPassword = require("./method/forgetPassword")("User"),
    resetPassword = require("./method/resetPassword")("User"),
    getAllProduct = require("./product/getAllProduct")("User"),
    addProductInCart = require("./cart/addProductInCart"),
    getCartProduct = require("./cart/getCartProduct"),
    updateProductInCart = require("./cart/updateInCart"),
    removeProductInCart = require("./cart/removeProductInCart"),
    makePayment = require("./cart/makePayment");

module.exports = {
    "/users/signUp": { ...registerUser },
    "/users/signIn": { ...loginUser },
    "/users/me": { ...getUser, ...updateUser, ...removeUser },
    "/users/resendToken": { ...resendToken },
    "/users/verify/{token}": { ...verify },
    "/users/reset": { ...forgetPassword },
    "/users/reset/{token}": { ...resetPassword },
    "/users/products": { ...getAllProduct },
    "/users/checkout": { ...getCartProduct },
    "/users/carts/{productId}": { ...addProductInCart, ...updateProductInCart, ...removeProductInCart },
    "/users/checkout/payment": { ...makePayment }
};
