const router = require("express").Router();
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: diskStorage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
