const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (requiredRole = 'user') => {
    return (req, res, next) => {
        let token = req.headers['token'] || req.cookies['token'];
        let adminToken = req.headers['Admintoken'] || req.cookies['Admintoken'];


        let decodedUserToken = token ? DecodeToken(token) : null;
        let decodedAdminToken = adminToken ? DecodeToken(adminToken) : null;

        console.log(`admin token is ${decodedAdminToken}`);

        if (!decodedUserToken && !decodedAdminToken) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        } 

        let decoded = null;
        if (decodedUserToken && decodedUserToken.role === requiredRole) {
            decoded = decodedUserToken;
        } else if (decodedAdminToken && decodedAdminToken.role === requiredRole) {
            decoded = decodedAdminToken;
        } else {
            return res.status(403).json({ status: "fail", message: "Forbidden: Insufficient privileges" });
        }
        
        const email = decoded['email'];
        const user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;

        if (requiredRole === 'admin') {
            req.headers.admin_id = user_id;
        }

        next();
    };
};
