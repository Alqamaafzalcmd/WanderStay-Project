const cloudinary = require('cloudinary');
const  CloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// configuring with cloudinary account info -----------
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});



/*
 * Cloudinary storage configuration for multer
 * @type {CloudinaryStorage}
 * @property {object} cloudinary - Cloudinary instance for authentication and API calls
 * @property {object} params - Storage parameters for Cloudinary uploads
 * @property {string} params.folder - Destination folder in Cloudinary ('wanderlust_dev')
 * @property {string[]} params.allowedFormats - Allowed file formats for upload (png, jpg, jpeg)
 */

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