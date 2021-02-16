const mongoose = require('mongoose');
const PostModel = require('./models/post.js');
const UserModel = require('./models/user.js');

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

  // Blog Post methods
  async addPost(newPost) {    
    const post = await PostModel.create(newPost);
    return post;
  }

  async getAllPosts() {
    const posts = await PostModel.find({}, '_id title image').sort({updatedAt:-1});
    return posts;
  }

  async findPostByID(id) {
    const post = await PostModel.findById(id);
    return post;
  }

  async deletePostByID(id) {
    const post = await PostModel.findByIdAndDelete(id);
    return post;
  }

  // User methods
  async addUser(newUser) {    
    const user = await UserModel.create(newUser);
    return user;
  }
  
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async findUser(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

  async findUserByID(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async setToken(id, refresh_token) {
    const user = await UserModel.findByIdAndUpdate(id, { refresh_token: refresh_token });
    return user;
  }
}

module.exports = Database