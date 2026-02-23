const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware");
const adminMiddleware = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload");

const { createProductsValidator } = require("../middlewares/productValidate");

const {
  createProduct,
  getAllUsers,
  toggleBlockUser
} = require("../controllers/admin.controller");

// Get all users (admin only)
// authMiddleware, adminMiddleware,
router.get("/users", getAllUsers);

// Create product (admin only)
// authMiddleware,
// adminMiddleware,

router.post("/products", upload.array("images", 1), createProduct);

router.patch("/users/:id/block", toggleBlockUser);

module.exports = router;
