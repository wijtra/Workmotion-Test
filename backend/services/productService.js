const Product = require("../models/productModel");

exports.getProducts = async (page = 1, limit = 10, search = "") => {
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  const products = await Product.find(query)
    .populate("categoryId", "name")
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Product.countDocuments(query);
  return { data: products, total };
};

exports.getProductById = (id) => Product.findById(id).populate("categoryId", "name");

exports.createProduct = (data) => Product.create(data);

exports.updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true }).populate("categoryId", "name");

exports.deleteProduct = (id) => Product.findByIdAndDelete(id);
