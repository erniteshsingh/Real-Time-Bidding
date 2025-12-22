const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware");
const adminMiddleware = require("../middlewares/admin.middleware");

const upload = require("../middlewares/upload");
const { createProductValidator } = require("../middlewares/productValidate");
const {
  getAllUsers,
  createProduct,
} = require("../controllers/admin.controller");

router.get("/allusers", authMiddleware, adminMiddleware, getAllUsers);

router.post(
  "/product",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 1),
  createProductValidator,
  createProduct
);

module.exports = router;
