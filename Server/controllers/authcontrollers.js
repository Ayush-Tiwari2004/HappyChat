const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists. Please login!",
                success: false
            });
        }

        // Encrypt the password and create a new user
        const encryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new userModel({
            username,
            email,
            password: encryptedPassword,
        });
        await newUser.save();

        // Generate token
        const jwtToken = jwt.sign(
            {
                _id: newUser._id,
                email: newUser.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "Signup successful",
            success: true,
            jwtToken,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            message: "Internal server error!",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errorMessage = "Authentication failed. Email or password is incorrect!";

        if (!user) {
            return res.status(403).json({
                message: errorMessage,
                success: false
            });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({
                message: errorMessage,
                success: false
            });
        } 

        const jwtToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {  // Return full user object consistently
                _id: user._id,
                username: user.username,
                email: user.email
            },
            jwtToken,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.userId;
        const otherUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.error("Error fetching other users:", error);
        return res.status(500).json({ message: "Error fetching other users" });
    }
}

module.exports = {
    signup,
    login,
    getOtherUsers
    
};