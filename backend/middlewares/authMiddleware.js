//authentication middleware
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    try {
        const token = await req.cookies.token;
        if (!token) {
            res.status(401);
            return next(new Error("Not authorized"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(404);
            return next(new Error("User not found"));
        }else{
            req.user = user;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = protect;