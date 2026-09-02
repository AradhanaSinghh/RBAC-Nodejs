const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const cookie = req.headers.cookie;

        if (!cookie) {
            return res.status(401).json({
                message: "Cookie missing"
            });
        }

        const token = cookie.replace("token=", "");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;