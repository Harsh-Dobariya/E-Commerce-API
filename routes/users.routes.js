const {
        registerUser,
        getUser,
        loginUser,
        updateUser,
        removeUser,
        verify,
        resendToken,
        forgetPassword,
        resetPassword
    } = require("../controllers/users"),
    { getAllProduct } = require("../controllers/products"),
    { addProductInCart, getCartProduct, removeProductInCart } = require("../controllers/carts"),
    { authenticate } = require("../middleware/authentication"),
    { validEmail, validChange, validId } = require("../middleware/validation"),
    { upload, uploadCloudinary } = require("../middleware/uploadImage"),
    { makePayment } = require("../service/payment"),
    router = require("express").Router();

router.post("/signUp", upload, uploadCloudinary, registerUser);

router.post("/signIn", loginUser);

router.get("/me", authenticate("user"), getUser);

router.put("/me", authenticate("user"), validChange, upload, uploadCloudinary, updateUser);

router.delete("/me", authenticate("user"), removeUser);

router.post("/resendToken", validEmail, resendToken);

router.get("/verify/:token", verify);

router.post("/reset", validEmail, forgetPassword);

router.post("/reset/:token", resetPassword);

router.get("/products", authenticate("user"), getAllProduct);

router.get("/checkout", authenticate("user"), getCartProduct);

router.post("/carts/:productId", authenticate("user"), validId, addProductInCart);

router.delete("/carts/:productId", authenticate("user"), validId, removeProductInCart);

router.get("/checkout/payment", authenticate("user"), makePayment);

module.exports = router;
