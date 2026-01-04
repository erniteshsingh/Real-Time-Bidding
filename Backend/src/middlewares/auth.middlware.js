const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Entter Inside Middleware");
  try {
    const token = req.cookies?.token;

    console.log(token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
