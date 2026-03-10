const cloudinary = require('cloudinary');
const  CloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// configuring with cloudinary account info -----------
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});



// defining storage CloudinaryStorage --------
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_dev',
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});


module.exports = {
    cloudinary,
    storage,
};