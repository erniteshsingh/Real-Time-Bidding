const express = require("express");
const {
  register,
  login,
  logout,
  profile,
  getWonAuctions,
} = require("../controllers/auth.controller");

const {
  registerUserValidations,
  loginValidator,
} = require("../middlewares/validate");

const authMiddleware = require("../middlewares/auth.middlware");

const router = express.Router();

router.post("/register", registerUserValidations, register);

router.post("/login", loginValidator, login);

router.get("/profile", authMiddleware, profile);

router.post("/logout", authMiddleware, logout);

router.get("/won-auctions", authMiddleware, getWonAuctions);

module.exports = router;
