const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"image" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000}
});

router.post("/", auth, upload.single("image"), (req, res) => {
  res.send('uploads/' + req.file.filename);
});

module.exports = router;
