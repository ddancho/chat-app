const multer = require("multer");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    req.profilePictureSlug =
      Date.now().toString() + "-" + req.session.user.email + "." + file.mimetype.split("/")[1];
    cb(null, req.profilePictureSlug);
  },
});

const fileFilter = (req, file, cb) => {
  let fileError = null;

  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/jpg" && file.mimetype !== "image/png") {
    fileError = {
      mimetype: "File type is not suported",
    };
  }

  if (file.size > 1 * 1000 * 1000) {
    fileError = {
      ...fileError,
      size: "File size too big, max size is 1MB",
    };
  }

  if (fileError) {
    req.fileError = {};
    req.fileError = Object.assign(req.fileError, fileError);
    return cb(null, false);
  }

  if (req.session.user.profilePicture) {
    const oldFile = "public/images/" + req.session.user.profilePicture;
    fs.unlink(oldFile, (err) => err && console.log(err));
  }

  cb(null, true);
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1 * 1000 * 1000 },
});

module.exports = {
  upload,
};
