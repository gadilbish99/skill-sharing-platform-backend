const path = require('path');
const multer = require("multer");

const storageOptions = {
  destination: "./public/uploads/",
  filename: function(req, file, cb){
      cb(null,"image" + Date.now() + path.extname(file.originalname));
  }
};

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
}

const FIVE_MB = 5 * 1024 * 1024;

const limits = { fileSize: FIVE_MB };

const multerOptions = {
  storage: multer.diskStorage(storageOptions),
  limits: limits,
  fileFilter: fileFilter 
};

const upload = multer(multerOptions).single("image")

module.exports = upload;