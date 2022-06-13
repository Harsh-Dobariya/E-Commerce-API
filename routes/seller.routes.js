const {
        registerSeller,
        getSeller,
        loginSeller,
        updateSeller,
        removeSeller,
        verify,
        resendToken,
        forgetPassword,
        resetPassword
    } = require("../controllers/sellers"),
    { addProduct, getAllProductBySeller, getProduct, updateProduct, removeProduct } = require("../controllers/products"),
    { authenticate } = require("../middleware/authentication"),
    { validEmail, validChange, validId } = require("../middleware/validation"),
    { upload, uploadCloudinary } = require("../middleware/uploadImage"),
    router = require("express").Router();

router.post("/signUp", upload, uploadCloudinary, registerSeller);

router.post("/signIn", loginSeller);

router.get("/me", authenticate("seller"), getSeller);

router.put("/me", authenticate("seller"), validChange, upload, uploadCloudinary, updateSeller);

router.delete("/me", authenticate("seller"), removeSeller);

router.post("/resendToken", validEmail, resendToken);

router.get("/verify/:token", verify);

router.post("/reset", validEmail, forgetPassword);

router.post("/reset/:token", resetPassword);

router.post("/products", authenticate("seller"), upload, uploadCloudinary, addProduct);

router.get("/products", authenticate("seller"), getAllProductBySeller);

router.get("/products/:productId", authenticate("seller"), validId, getProduct);

router.put("/products/:productId", authenticate("seller"), validId, upload, uploadCloudinary, updateProduct);

router.delete("/products/:productId", authenticate("seller"), validId, removeProduct);

module.exports = router;
