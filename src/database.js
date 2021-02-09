const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');
const PostModel = require('./db/post.js');

const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'skill-sharing-platform';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false
    })
      .then(async () => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }

  // User methods
  async addPost(newPost) {    
    const post = await PostModel.create(newPost);
    return post;
  }

  async getAllPosts() {
    const posts = await PostModel.find().sort({date:-1});
    return posts;
  }

  async findPostByID(id) {
    const post = await PostModel.findById(id);
    return post;
  }
}

module.exports = Database