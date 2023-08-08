const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    email:{
        type: String,
        required: [true, "Please enter an email address"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    password:{
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Password is too short"],
        maxlength: [255, "Password is too long"]
    },
    photo:{
        type: String,
        required: false,
    },
    phonenumber:{
        type: String,
        required: false,
        default: "+234-"
    },
    bio:{
        type: String,
        default: "Please add a bio to your profile",
        minLength: [10, "Your bio shouldn't be less than 10 characters"],
        maxLength: [1000, "Bio is too long"],
    },

},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User;