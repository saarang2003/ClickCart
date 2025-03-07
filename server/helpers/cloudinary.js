const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'duuxfeipp',
    api_key :'868428426525667',
    api_secret : '7e316pMVs0AgJ9lHiS3cSKCv6gQ'
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
  
    return result;
  }
  
  const upload = multer({ storage });
  
  module.exports = { upload, imageUploadUtil };

  