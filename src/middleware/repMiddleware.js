const jwt = require("jsonwebtoken");
const accessTokenKey = process.env.RE_JWT_SECRET;

const isLogInRep = (req, res, next) => {
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
        const phone = decode.phone;
        req.headers.repId = id;
        req.headers.role = role;
        req.headers.phone = phone;
        req.headers.referId = decode.representative_id;
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

const isLogOutRep = (req, res, next) => {
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

const isRep = (req, res, next) => {
    try {
        let admin = req.user.isAdmin
    } catch (error) {

    }
};


module.exports = {  isLogOutRep,isRep,isLogInRep }