require('dotenv/config');
const mongoose = require('mongoose');
const connection = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;    
  
const connect = () => {
  mongoose.connect(`${connection}://${host}:${port}/${database}`, { 
    keepAlive: 1,
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

module.exports = { connect }