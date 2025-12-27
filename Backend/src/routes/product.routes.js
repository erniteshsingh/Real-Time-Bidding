const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/product.controller");

router.get("/getallProducts", getAllProducts);

module.exports = router;
