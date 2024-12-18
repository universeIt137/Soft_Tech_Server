// const { DecodeToken } = require("../utility/TokenHelper");

// module.exports = (requiredRole = 'user') => {
//     return (req, res, next) => {
//         let token = req.headers['token'] || req.cookies['token'];
//         let adminToken = req.headers['Admintoken'] || req.cookies['Admintoken'];


//         let decodedUserToken = token ? DecodeToken(token) : null;
//         let decodedAdminToken = adminToken ? DecodeToken(adminToken) : null;

//         if (!decodedUserToken && !decodedAdminToken) {
//             return res.status(401).json({ status: "fail", message: "Unauthorized" });
//         } 

//         let decoded = null;
//         if (decodedUserToken && decodedUserToken.role === requiredRole) {
//             decoded = decodedUserToken;
//         } else if (decodedAdminToken && decodedAdminToken.role === requiredRole) {
//             decoded = decodedAdminToken;
//         } else {
//             return res.status(403).json({ status: "fail", message: "Forbidden: Insufficient privileges" });
//         }

//         const email = decoded['email'];
//         const user_id = decoded['user_id'];
//         req.headers.email = email;
//         req.headers.user_id = user_id;

//         if (requiredRole === 'admin') {
//             req.headers.admin_id = user_id;
//         }

//         next();
//     };
// };



const jwt = require("jsonwebtoken");
const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;

const isLogin = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: "fail",
                msg: "Unauthorized user"
            });
        }
        let decode = jwt.verify(token, accessTokenKey);
        const id = decode.id;
        const role = decode.role;


        req.headers.id = id;
        req.headers.role = role;

        if (!decode) {
            return res.status(401).json({
                status: "fail",
                msg: "Invalid token please login"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            msg: error.toString()
        });
    }
};

const isLogout = (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken;
        if (accessToken) {
            let decode = jwt.verify(accessToken, accessTokenKey);
            if (decode) {
                return res.status(409).json({
                    status: "fail",
                    msg: "You have already login"
                })
            } else {
                return res.status(401).json({
                    status: "fail",
                    msg: "User token expired"
                });
            }
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        });
    }
};

const isAdmin = (req, res, next) => {
    try {
        let role = req.headers.role;
        if (role !== "admin") {
            return res.status(403).json({
                status: "fail",
                msg: "You have not permission"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        })
    }
};



module.exports = { isLogin,isLogout,isAdmin }