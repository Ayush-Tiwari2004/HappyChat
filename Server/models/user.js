const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
    },
    password: {
        type : String,
        required : true,
    },
    otp: {
        type: String, // OTP for password reset
    },
    otpExpires: {
        type: Date, // OTP expiration time
    },
    isOTPVerified: { 
        type: Boolean, 
        default: false 
    },
    profilePic: {
        type: String,
        default: "",
      },
},{ timestamps: true });

module.exports = mongoose.model("user", userSchema);