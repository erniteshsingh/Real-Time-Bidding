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
    const products = req.body;

    // 1️⃣ Validate array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products array is required",
      });
    }

    // 2️⃣ Prepare products
    const formattedProducts = products.map((item, index) => {
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
        images,
        isAuction,
        auctionStartTime,
        auctionEndTime,
        minimumBidIncrement,
      } = item;

      if (!title || !description || !price || !category || !brand || !model) {
        throw new Error(`Missing required fields at index ${index}`);
      }

      if (!Array.isArray(images) || images.length === 0) {
        throw new Error(`Images missing at index ${index}`);
      }

      // 🔐 Auction validation
      if (isAuction && (!auctionStartTime || !auctionEndTime)) {
        throw new Error(`Auction time missing at index ${index}`);
      }

      return {
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
        isAuction: Boolean(isAuction),
        auctionStartTime: isAuction ? new Date(auctionStartTime) : null,
        auctionEndTime: isAuction ? new Date(auctionEndTime) : null,
        minimumBidIncrement: minimumBidIncrement || 1000,

        currentBid: 0,
        totalBids: 0,
        auctionEnded: false,
        bidHistory: [],
        status: isAuction ? "live" : "draft",

        createdBy: req.user.id,
      };
    });

    // 3️⃣ Insert into DB
    const createdProducts = await Product.insertMany(formattedProducts);

    return res.status(201).json({
      success: true,
      message: `${createdProducts.length} products created successfully`,
      data: createdProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create products",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      total: products.length,
      data: products,
    });
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

module.exports = {
  getAllUsers,
  createProduct,
  getAllProducts,
  getSingleProduct,
};
