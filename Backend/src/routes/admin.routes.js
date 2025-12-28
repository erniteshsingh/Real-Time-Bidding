const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware");
const adminMiddleware = require("../middlewares/admin.middleware");

// I will use later once Admin Dashboard got Create
// const upload = require("../middlewares/upload");
const { createProductsValidator } = require("../middlewares/productValidate");
const {
  getAllUsers,
  createProduct,
} = require("../controllers/admin.controller");

router.get("/allusers", authMiddleware, adminMiddleware, getAllUsers);

router.post(
  "/product",
  authMiddleware,
  adminMiddleware,
  createProductsValidator,
  createProduct
);

module.exports = router;
