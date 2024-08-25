const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (requiredRole = 'user') => {
    return (req, res, next) => {
        let token = req.headers['token'];
        if (!token) {
            token = req.cookies['Admintoken']; // Change from 'token' to 'Admintoken'
        }

        const decoded = DecodeToken(token);

        if (decoded === null) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        } else {
            const email = decoded['email'];
            const user_id = decoded['user_id'];
            req.headers.email = email;
            req.headers.user_id = user_id;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ status: "fail", message: "Forbidden: Insufficient privileges" });
            }

            if (requiredRole === 'admin') {
                req.headers.admin_id = user_id;
            }

            next();
        }
    };
};
