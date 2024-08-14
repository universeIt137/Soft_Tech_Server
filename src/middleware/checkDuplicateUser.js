const UserModel = require("../models/UserModel");

const checkDuplicateUser = async (user) => {
    try {
        const query = { email: user.email }
        const existingUser = await UserModel.findOne(query);
        return existingUser
    } catch (e) {
        res.status(400).json({ status: 'failed' })
    }
}
module.exports = checkDuplicateUser 