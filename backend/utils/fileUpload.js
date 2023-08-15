const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "" + file.originalname
    );
  },
});
//specify file format that can be saved
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" || //specify file format that can be saved
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//specify file size limit
const limits = {
  fileSize: 1024 * 1024 * 5, //5MB
};
//export upload function
const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = { upload };
