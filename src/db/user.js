const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
        max: 100
    },
    lastName: { 
        type: String,
        required: true,
        max: 100
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        },
        max: 200
    },
    password: { 
        type: String, 
        required: true,
        max: 255
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