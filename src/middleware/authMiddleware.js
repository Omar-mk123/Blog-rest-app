const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select(
            "-password"
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        console.log("AUTH USER:", {
            id: user._id.toString(),
            role: user.role
        });

        next();

    } catch (error) {
        console.error("Auth Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = {
    protect
};
