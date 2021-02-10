const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        }
    },
    password: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    refresh_token: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);