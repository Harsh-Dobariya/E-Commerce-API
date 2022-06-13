const {
        registerAdmin,
        getAdmin,
        loginAdmin,
        updateAdmin,
        removeAdmin,
        verify,
        resendToken,
        forgetPassword,
        resetPassword
    } = require("../controllers/admins"),
    { getAllUser, removeUserByAdmin } = require("../controllers/users"),
    { getAllSeller, removeSellerByAdmin } = require("../controllers/sellers"),
    { getAllProduct } = require("../controllers/products"),
    { authenticate } = require("../middleware/authentication"),
    { validEmail, validChange, validId } = require("../middleware/validation"),
    { upload, uploadCloudinary } = require("../middleware/uploadImage"),
    router = require("express").Router();

router.post("/signUp", upload, uploadCloudinary, registerAdmin);

router.post("/signIn", loginAdmin);

router.get("/me", authenticate("admin"), getAdmin);

router.put("/me", authenticate("admin"), validChange, upload, uploadCloudinary, updateAdmin);

router.delete("/me", authenticate("admin"), removeAdmin);

router.post("/resendToken", validEmail, resendToken);

router.get("/verify/:token", verify);

router.post("/reset", validEmail, forgetPassword);

router.post("/reset/:token", resetPassword);

router.get("/users", authenticate("admin"), getAllUser);

router.delete("/users/:userId", authenticate("admin"), validId, removeUserByAdmin);

router.get("/sellers", authenticate("admin"), getAllSeller);

router.delete("/sellers/:sellerId", authenticate("admin"), validId, removeSellerByAdmin);

router.get("/products", authenticate("admin"), getAllProduct);

module.exports = router;
