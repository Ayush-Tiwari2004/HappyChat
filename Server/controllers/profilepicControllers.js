const userModel = require('../models/user')
const { handleCloudinaryUpload } = require('../config/multerconfig')

const uploadProfilePic =  async (req, res) => {
    try {
        const userId = req.body.userId;
        const localFilePath = req.file.path;

        // Upload to Cloudinary
        const cloudinaryUrl = await handleCloudinaryUpload(localFilePath);
        
        // Update user's profile picture in DB
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            { profilepic: cloudinaryUrl }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Profile picture updated successfully', 
            profilepic: updatedUser.profilepic 
        });
    } catch (error) {
        console.error('Profile picture update error:', error);
        res.status(500).json({ message: 'Error updating profile picture', error });
    }
};

module.exports = uploadProfilePic;