const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};

const createProductsValidator = [
  body().isArray({ min: 1 }).withMessage("Products array is required"),

  body("*.title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("*.description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("*.price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("*.category").notEmpty().withMessage("Category is required"),

  body("*.images")
    .isArray({ min: 1 })
    .withMessage("At least one image is required"),

  validateRequest,
];

module.exports = {
  createProductsValidator,
};
