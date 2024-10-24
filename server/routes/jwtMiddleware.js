import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "jwt_secret_key", (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.customer_ID = decodedToken.customer_ID; // Use customer_ID from token
    next(); // Proceed to next middleware
  });
};

export default authenticateToken;