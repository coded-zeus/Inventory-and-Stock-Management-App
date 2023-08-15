const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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

    if (!userExists) {
      res.status(400);
      return next(new Error("Can't find email. Sign Up instead."));
    }
    if (email !== userExists.email) {
      res.status(400);
      return next(new Error("Email doesn't match"));
    }
    if (password !== userExists.password) {
      res.status(400);
      return next(new Error(" Password doesn't match"));
    } else {
      passwordIsCorrect = true;
    }

    if (!passwordIsCorrect) {
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

const logoutUser = async (req, res, next) => {
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
};

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
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.photo = req.body.photo || user.photo;
      user.phonenumber = req.body.phonenumber || user.phonenumber;
      user.bio = req.body.bio || user.bio;

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
};

const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(404);
      return next(new Error("Please fill all fields"));
    }
    if (oldPassword === newPassword) {
      res.status(404);
      return next(new Error("Old Password can't be the same as new Password"));
    }
    if (newPassword !== confirmPassword) {
      res.status(404);
      return next(new Error("Passwords don't match!"));
    }
    if (oldPassword !== user.password) {
      res.status(404);
      return next(new Error("Please input correct current password!!"));
    }

    if (oldPassword === user.password && newPassword === confirmPassword) {
      user.password = newPassword;
      const updatedUserInfo = await user.save();
      const { password } = updatedUserInfo;
      res.status(200).json({
        success: "Password updated successfully",
        password: updatedUserInfo.password,
      });
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    return next(new Error("User not found"));
  }
  let resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000),
  }).save();

  //construct reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `
  <h1>Hello ${user.name}</h1>
    <h4>You have requested a password reset</h4>
    <p>Here is the link</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = "ibrahimdev2018@outlook.com";

  try {
    await sendEmail(subject, send_to, sent_from, message);
    res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    res.status(500);
    return next(new Error("Email not sent"));
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUser,
  changePassword,
  forgotPassword,
};
