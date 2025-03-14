const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles)=> (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, "JWT_SECRET_KEY");
        req.user = decoded;

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;