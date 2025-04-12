const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token ❌" });
    }
  } else {
    return res.status(401).json({ message: "No token provided ❌" });
  }
};
module.exports = protect;
