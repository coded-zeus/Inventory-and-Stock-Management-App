const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateWebToken = (id) =>{
    jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        res.status(400);
        return next(new Error("Please fill all fields"));
    }

    if (password.length < 6) {
        res.status(400);
        return next(new Error("Password must be more than 6 characters"));
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            return next(new Error("User already exists"));
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const { _id, photo, phonenumber, bio } = user;

        res.status(201).json({
            _id, name, email, photo, phonenumber, bio
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
};
