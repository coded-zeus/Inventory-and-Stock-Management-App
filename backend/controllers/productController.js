const Product = require("../models/productModel");

const createProduct = async (req, res, next) => {
  const { name, desc, price, quantity, sku, category } = req.body;

  try {
    if (!name || !desc || !sku || !category || !price || !quantity) {
      res.status(400);
      return next(new Error("Please fill all fields"));
    }

    const newProduct = await new Product({
      user: req.user.id,
      sku,
      category,
      price,
      quantity,
      desc,
    });

    if (!newProduct) {
      res.status(400);
      return next(new Error("Products can't be saved"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
};
