const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gamerpandit00100@gmail.com",
        pass: "dspp paer odkw sreq"
    }
})

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const resetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: "Email is required",
            success: false
        })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        const otp = generateOTP();
        const otpExpires = Date.now() + 15 * 60 * 1000; // expires opt in 15 min

        await userModel.findByIdAndUpdate(user._id, {
            otp: otp,
            otpExpires: otpExpires
        })

        const mailOption = {
            from: "ayushtiwari2004m@gmail.com",
            to: email,
            subject: "password Reset OTP.",
            text: `your OTP for password recet is: ${otp}. this otp is valid for 15 minutes.`,
        };

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({
                    message: "Failed to send OTP",
                    success: false,
                })
            }
            else {
                return res.status(200).json({
                    message: "OTP send successfully!",
                    success: true,
                })
            }
        })
    }
    catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// verify OTP
const verifyOTP = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.status(400).json({
            message: "OTP is required!",
            success: false,
        });
    }

    try {
        // OTP match karne ke liye hum userModel se OTP dhundhenge
        const user = await userModel.findOne({ otp });

        if (!user) {
            return res.status(404).json({
                message: "Invalid OTP",
                success: false,
            });
        }

        // Check karein ki OTP expire to nahi hua
        if (user.otpExpires > Date.now()) {
            // Mark OTP as verified
            user.isOTPVerified = true;
            await user.save();
            return res.status(200).json({
                message: "OTP verified successfully",
                success: true,
            });
        } else {
            return res.status(401).json({
                message: "OTP expired",
                success: false,
            });
        }
    } catch (error) {
        console.error("Error in verifyOTP:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


// change password
const changePassword = async (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword) {
        return res.status(400).json({
            message: "Email, OTP, and new password are required",
            success: false,
        });
    }

    try {
        const user = await userModel.findOne({ isOTPVerified: true });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // verify otp befour allowind password change
        if (user.otpExpires > Date.now()) {

            const hasTheNewPassword = await bcrypt.hash(newPassword, 12);
            await userModel.findByIdAndUpdate(user._id, {
                password: hasTheNewPassword,
                otp: undefined,
                otpExpires: undefined,
                isOTPVerified : undefined,
            })

            return res.status(200).json({
                message: "Password changed successfully",
                success: true,
            });
        }
        else {
            res.status(401).json({
                message: "Invalid or expired OTP",
                success: false,
            });
        }
    }
    catch (error) {
        console.error("Error in changePassword:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

module.exports = {
    resetPassword,
    verifyOTP,
    changePassword
}