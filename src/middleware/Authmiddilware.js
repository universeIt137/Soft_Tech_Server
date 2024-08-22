const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (requiredRole = 'user') => {
    return (req, res, next) => {
        // Receive Token
        let token = req.headers['token'];
        if (!token) {
            token = req.cookies['token'];
        }

        // Token Decode
        const decoded = DecodeToken(token);

        // Request Header Email + UserID Add
        if (decoded === null) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        } else {
            const email = decoded['email'];
            const user_id = decoded['user_id'];
            req.headers.email = email;
            req.headers.user_id = user_id;

            // Optionally check the role if provided
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ status: "fail", message: "Forbidden: Insufficient privileges" });
            }

            next();
        }
    };
};
