const createError = require("http-errors"),
    multer = require("multer"),
    Datauri = require("datauri/parser"),
    cloudinary = require("../config/cloudinary"),
    path = require("path");

module.exports = {
    upload: multer({
        limits: {
            fileSize: 10000000
        },
        fileFilter(req, file, cb) {
            if (!file?.originalname.match(/\.(jpg|jpeg|png)$/))
                throw createError(400, "please upload only .jpg, .jpeg, .png file.");

            cb(undefined, true);
        }
    }).single("profileImage"),

    uploadCloudinary: (req, res, next) => {
        if (!req.file) return next();

        const dataUri = new Datauri();
        let image = dataUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

        cloudinary.uploader.upload(image.content, (err, { secure_url }) => {
            if (err) return next(err);

            req.body.profileImage = secure_url;
            next();
        });
    }
};
