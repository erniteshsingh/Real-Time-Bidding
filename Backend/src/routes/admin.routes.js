const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware");
const adminMiddleware = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload");

// I will use later once Admin Dashboard got Create
// const upload = require("../middlewares/upload");
const { createProductsValidator } = require("../middlewares/productValidate");
const {
  getAllUsers,
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/admin.controller");

router.get("/allusers", authMiddleware, adminMiddleware, getAllUsers);

// authMiddleware,
// adminMiddleware,
// createProductsValidator,

router.post("/cars", upload.array("images", 1), createProduct);

// What user can do!

//Find all the products
router.get("/cars", getAllProducts);

//find single product
router.get("/getSingleProduct/:id", getSingleProduct);

module.exports = router;
