const { body, validationResult } = require("express-validator");

const responseWithValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

const registerUserValidations = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least 1 lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least 1 number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least 1 special character"),
  responseWithValidationResult,
];

const loginValidator = [
  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("Password is required"),

  responseWithValidationResult,
];

module.exports = {
  registerUserValidations,
  loginValidator,
};
