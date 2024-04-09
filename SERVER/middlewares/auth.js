// authMiddleware.js
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token =
      req.cookies.token ||
      req.headers["authorization"].replace("Bearer", "").trim();

    console.log("token : ", token);

    // Check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for further processing
    req.user = decoded.userId;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = auth;
