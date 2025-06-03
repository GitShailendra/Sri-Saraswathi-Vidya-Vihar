const Admin = require("../models/AdminModel");

const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    // Get admin from token
    const manageAdmin = await Admin.findById(decoded.id);

    if (!manageAdmin) {
      return res.status(401).json({ message: "manageAdmin not found" });
    }
    req.user = manageAdmin;
    req.userType = "admin";
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = {protect};
