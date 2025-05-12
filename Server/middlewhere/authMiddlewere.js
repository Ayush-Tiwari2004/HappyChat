const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // console.log("Authorization Header:", req.header("Authorization")); // Debugging
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        // console.log("Decoded User ID:", req.userId); // Debugging
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
