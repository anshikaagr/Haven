const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect =  async(req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log("Decoded JWT:", decoded);
    req.user = await User.findById(decoded.id).select("-password");;
    console.log("req.user:", req.user);
    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = protect;