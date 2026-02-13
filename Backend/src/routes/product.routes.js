
const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product.controller");

// GET all products (Home Page)
router.get("/", getAllProducts);

// GET single product
router.get("/:id", getSingleProduct);

module.exports = router;
