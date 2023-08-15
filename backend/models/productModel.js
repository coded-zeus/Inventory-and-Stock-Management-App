const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter your product name"],
      unique: [true, "Product already exists"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter your product category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a product quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter a price"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Please enter product description"],
      minLength: [6, "Description is too short"],
      maxlength: [3000, "Description is too long"],
      default: "Description",
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
