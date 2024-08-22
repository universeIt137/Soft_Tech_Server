const jwt = require('jsonwebtoken');
require('dotenv').config();

// Common Encode Token Function (for both User and Admin)
exports.EncodeToken = (email, user_id, role = 'user') => { // Default role is 'user'
    const Key = process.env.ACCESS_TOKEN_SECRET || "free_palestine_5548"; // Use the secret from .env or fallback
    const EXPIRE = { expiresIn: '24h' };
    const PAYLOAD = { email, user_id, role }; // Include role in payload
    return jwt.sign(PAYLOAD, Key, EXPIRE);
};

// Common Decode Token Function (for both User and Admin)
exports.DecodeToken = (token) => {
    try {
        const Key = process.env.ACCESS_TOKEN_SECRET || "free_palestine_5548"; // Use the secret from .env or fallback
        return jwt.verify(token, Key);
    } catch (err) {
        return null;
    }
};
