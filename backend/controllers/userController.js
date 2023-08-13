const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

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
      password,
    });

    const { _id, photo, phonenumber, bio } = user;
    const token = generateWebToken(_id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phonenumber,
      password,
      bio,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error("Please fill all fields"));
  }

  if (password.length < 6) {
    res.status(400);
    return next(new Error("Password must be more than 6 characters"));
  }

  try {
    const userExists = await User.findOne({ email });

    if (password !== userExists.password) {
        res.status(400);
        return next(new Error(" Password doesn't match"));
    }else{
        passwordIsCorrect = true;
    }

    if (!userExists || !passwordIsCorrect) {
      res.status(400);
      return next(new Error("Invalid email or password"));
    } else {
      const { _id, photo, phonenumber, bio } = userExists;
      const token = generateWebToken(_id);
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        _id,
        name,
        email,
        photo,
        phonenumber,
        password,
        bio,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res,next) => {
    try {
        res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
        });
        res.status(200).json({
        message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        const { _id, name, email, photo, phonenumber, bio } = user;
        res.status(200).json({
        _id,
        name,
        email,
        photo,
        phonenumber,
        bio,
        });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        
        if (user) {
        user.name = req.body.name || user.name;
        user.email = user.email
        user.photo = user.photo || req.body.photo;
        user.phonenumber = user.phonenumber || req.body.phonenumber;
        user.bio = user.bio || req.body.bio;

        const updatedUser = await user.save();

        const { _id, name, email, photo, phonenumber, bio } = updatedUser;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phonenumber,
            bio,
        });
        } else {
        res.status(404);
        return next(new Error("User not found"));
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUser
};
