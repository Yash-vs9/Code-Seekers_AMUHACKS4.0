
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 

const verifyToken = (req, res, next) => {
  console.log("Entered middleware");
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No auth header");
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token in header");
    return res.status(403).json({ message: "Token format is incorrect" });
  }

  console.log("Token received:", token);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token invalid:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;