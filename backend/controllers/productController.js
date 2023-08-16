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

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ user: req.user.id });
    if (!products) {
      res.status(400);
      return next(new Error("Products can't be found"));
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400);
      return next(new Error("Product can't be found"));
    }
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      return next(new Error("Not authorized"));
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400);
      return next(new Error("Product can't be found"));
    }
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      return next(new Error("Not authorized"));
    }
    await product.remove();
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};

//update product
const updateProduct = async (req, res, next) => {
  const { name, desc, price, quantity, sku, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    return next(new Error("Product can't be found"));
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    return next(new Error("Not authorized"));
  }
  try {
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

    const updatedProduct = await Product.findByIdAndUpdat(
      {
        _id: req.params.id,
        name: name || product.name,
        desc: desc || product.desc,
        price: price || product.price,
        quantity: quantity || product.quantity,
        sku: sku || product.sku,
        category: category || product.category,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      res.status(400);
      return next(new Error("Products can't be saved"));
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
