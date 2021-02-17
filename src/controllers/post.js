const PostModel = require('../models/post');

const create = async (req, res) => {    
  try {
    const post = await PostModel.create(req.body);
    if (post)
      res.status(201).send({ 
        msg: 'Post Created' 
      });
    else
      throw new Error('Database error');
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const list = async (req, res) => {    
  try {
    const posts = await PostModel.find({}, '_id title image').sort({createdAt:-1});
    if (posts) 
      res.send(posts);
    else
      throw new Error('Database error');
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const show = async (req, res) => {    
  try {
    const post = await PostModel.findById(req.params.id);
    if (post)
      res.send(post);
    else
      throw new Error('Database error');
  } catch (error) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const update = async (req, res) => {    
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id);
    if (post)
      res.send({ 
        msg: 'Post Updated' 
      });
    else
      throw new Error('Database error');
  } catch (error) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const destroy = async (req, res) => {    
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    if (post)
      res.send('Deleted Post ' + req.params.id);
    else
      throw new Error('Database error');
  } catch (error) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
};