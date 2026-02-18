const User = require("../models/user.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

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
      isAuction,
      auctionStartTime,
      auctionEndTime,
      minimumBidIncrement,
    } = req.body;

    // Required field validation
    if (!title || !description || !price || !category || !brand || !model) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Image validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const images = req.files.map((file) => file.filename);

    const auctionEnabled = isAuction === "true" || isAuction === true;

    let status = "draft";
    let startTime = null;
    let endTime = null;

    if (auctionEnabled) {
      if (!auctionStartTime || !auctionEndTime) {
        return res.status(400).json({
          success: false,
          message: "Auction start and end time required",
        });
      }

      startTime = new Date(auctionStartTime);
      endTime = new Date(auctionEndTime);

      if (startTime >= endTime) {
        return res.status(400).json({
          success: false,
          message: "Auction end time must be after start time",
        });
      }

      const now = new Date();

      if (now < startTime) {
        status = "upcoming";
      } else if (now >= startTime && now <= endTime) {
        status = "live";
      } else {
        status = "ended";
      }
    }

    const productData = {
      title,
      brand,
      model,
      description,
      price: Number(price),
      category,
      fuelType,
      transmission,
      mileage,
      images,

      isAuction: auctionEnabled,
      auctionStartTime: startTime,
      auctionEndTime: endTime,
      minimumBidIncrement: minimumBidIncrement
        ? Number(minimumBidIncrement)
        : 1000,

      currentBid: 0,
      totalBids: 0,
      auctionEnded: false,
      bidHistory: [],
      status,

      createdBy: req.user?._id, // assuming you use auth middleware
    };

    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 }).lean();

//     return res.status(200).json({
//       success: true,
//       message: "Products fetched successfully",
//       total: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error("GET ALL PRODUCTS ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const getSingleProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     console.error("Get Single Product Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch product",
//     });
//   }
// };

module.exports = {
  getAllUsers,
  createProduct,
};
