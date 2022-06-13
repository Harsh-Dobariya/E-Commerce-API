const registerAdmin = require("./method/register")("Admin"),
    loginAdmin = require("./method/login")("Admin"),
    getAdmin = require("./method/get")("Admin"),
    updateAdmin = require("./method/update")("Admin"),
    removeAdmin = require("./method/remove")("Admin"),
    resendToken = require("./method/resendToken")("Admin"),
    verify = require("./method/verify")("Admin"),
    forgetPassword = require("./method/forgetPassword")("Admin"),
    resetPassword = require("./method/resetPassword")("Admin"),
    getAllUser = require("./method/getAll")("User"),
    removeUserByAdmin = require("./method/removeByAdmin")("User", "userId"),
    getAllSeller = require("./method/getAll")("Seller"),
    removeSellerByAdmin = require("./method/removeByAdmin")("Seller", "sellerId"),
    getAllProduct = require("./product/getAllProduct")("Admin");

module.exports = {
    "/admins/signUp": { ...registerAdmin },
    "/admins/signIn": { ...loginAdmin },
    "/admins/me": { ...getAdmin, ...updateAdmin, ...removeAdmin },
    "/admins/resendToken": { ...resendToken },
    "/admins/verify/{token}": { ...verify },
    "/admins/reset": { ...forgetPassword },
    "/admins/reset/{token}": { ...resetPassword },
    "/admins/users": { ...getAllUser },
    "/admins/users/{userId}": { ...removeUserByAdmin },
    "/admins/sellers": { ...getAllSeller },
    "/admins/sellers/{sellerId}": { ...removeSellerByAdmin },
    "/admins/products": { ...getAllProduct }
};
