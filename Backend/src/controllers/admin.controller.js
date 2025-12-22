const User = require("../models/user.model");
const product = require("../models/product.model");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // multer yahan files de deta hai
    const images = req.files.map((file) => file.path);

    const createdproduct = await product.create({
      title,
      description,
      price,
      category,
      images,
      createdBy: req.user.id,
    });

    res.status(201).json({
      status: true,
      message: "Product created successfully",
      createdproduct,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createProduct,
};
