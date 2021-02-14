const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../utils/upload')

router.post("/", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      let statusCode = 400;
      switch (err.message) {
        case 'File too large':
          statusCode = 413;
          break;
        default:
          break;
      }
      res.status(statusCode).send({
        error: `${err.message}`,
      });
    }
    else
      res.send('uploads/' + req.file.filename);    
  })
});

module.exports = router;
