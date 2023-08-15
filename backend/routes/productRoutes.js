const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { createProduct } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createProduct);

module.exports = router;
