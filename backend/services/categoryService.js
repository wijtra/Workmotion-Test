const Category = require("../models/categoryModel");

exports.getCategories = async (page = 1, limit = 10, search = "") => {
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  const categories = await Category.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Category.countDocuments(query);
  return { data: categories, total };
};

exports.getCategoryById = (id) => Category.findById(id);

exports.createCategory = (data) => Category.create(data);

exports.updateCategory = (id, data) =>
  Category.findByIdAndUpdate(id, data, { new: true });

exports.deleteCategory = (id) => Category.findByIdAndDelete(id);
