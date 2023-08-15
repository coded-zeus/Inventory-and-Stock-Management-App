const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res, next) => {
  const { name, desc, price, quantity, sku, category } = req.body;

  try {
    if (!name || !desc || !sku || !category || !price || !quantity) {
      res.status(400);
      return next(new Error("Please fill all fields"));
    }
    //handle file upload
    let fileData = {};
    if (req.file) {
      //save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Upload",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        next(new Error("Image upload failed"));
      }

      fileData = {
        fileName: req.file.filename,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      };
    }

    const newProduct = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      price,
      quantity,
      desc,
      image: fileData,
    });

    if (!newProduct) {
      res.status(400);
      return next(new Error("Products can't be saved"));
    }
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
};
