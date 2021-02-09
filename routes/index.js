const express = require('express');
const router = express.Router();

const mockPost = {
  summary: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  title: "My Post",
  image: "https://bit.ly/39VxniL"
};

const mockPosts = Array(10).fill(mockPost); 

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers)
  res.send(mockPosts);
});

module.exports = router;
