const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware");
const adminMiddleware = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload");

// I will use later once Admin Dashboard got Create
// const upload = require("../middlewares/upload");
// const { createProductsValidator } = require("../middlewares/productValidate");

const {
  createProduct,
  getAllUsers,
} = require("../controllers/admin.controller");

// Get all users (admin only)
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Create product (admin only)
router.post(
  "/products",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 1),
  createProduct
);



module.exports = router;
