const User = require("../models/user.model");
const Product = require("../models/product.model");
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
    const {
      title,
      description,
      price,
      category,
      brand,
      model,
      fuelType,
      transmission,
      mileage,
      auctionStartTime,
      auctionEndTime,
    } = req.body;

    if (!title || !description || !price || !category || !brand || !model) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    const images = req.files.map((file) => `uploads/${file.filename}`);
    console.log(images);

    const product = await Product.create({
      title,
      brand,
      model,
      description,
      price,
      category,
      fuelType,
      transmission,
      mileage,
      images,
      auctionStartTime,
      auctionEndTime,
      status: "live",
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  createProduct,
};
