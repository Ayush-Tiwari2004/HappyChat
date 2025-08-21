const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for temporary storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Server/public/images');
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, buffer) => {
            if (err) return cb(err);
            const filename = buffer.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});

const upload = multer({ storage: storage });

// Helper function to upload to Cloudinary and delete local file
const handleCloudinaryUpload = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath);
        // Delete local file after successful upload
        fs.unlink(localFilePath, (err) => {
            if (err) console.error('Error deleting local file:', err);
        });
        return result.secure_url;
    } catch (error) {
        // Delete local file if upload fails
        fs.unlink(localFilePath, (err) => {
            if (err) console.error('Error deleting local file:', err);
        });
        throw error;
    }
};

module.exports = { upload, handleCloudinaryUpload };
