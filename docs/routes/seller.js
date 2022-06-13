const registerSeller = require("./method/register")("Seller"),
    loginSeller = require("./method/login")("Seller"),
    getSeller = require("./method/get")("Seller"),
    updateSeller = require("./method/update")("Seller"),
    removeSeller = require("./method/remove")("Seller"),
    resendToken = require("./method/resendToken")("Seller"),
    verify = require("./method/verify")("Seller"),
    forgetPassword = require("./method/forgetPassword")("Seller"),
    resetPassword = require("./method/resetPassword")("Seller"),
    addProduct = require("./product/addProduct"),
    getAllProduct = require("./product/getAllProduct")("Seller"),
    getProduct = require("./product/getProduct"),
    updateProduct = require("./product/updateProduct"),
    removeProduct = require("./product/removeProduct");

module.exports = {
    "/sellers/signUp": { ...registerSeller },
    "/sellers/signIn": { ...loginSeller },
    "/sellers/me": { ...getSeller, ...updateSeller, ...removeSeller },
    "/sellers/resendToken": { ...resendToken },
    "/sellers/verify/{token}": { ...verify },
    "/sellers/reset": { ...forgetPassword },
    "/sellers/reset/{token}": { ...resetPassword },
    "/sellers/products": { ...addProduct, ...getAllProduct },
    "/sellers/products/{productId}": { ...getProduct, ...updateProduct, ...removeProduct }
};
