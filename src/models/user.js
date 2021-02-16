const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
        trim: true,
        max: 100
    },
    lastName: { 
        type: String,
        required: true,
        trim: true,
        max: 100
    },
    email: { 
        type: String,
        required: true,
        trim: true,
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
        trim: true,
        max: 255
    },
    refresh_token: {
        type: String,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        trim: true,
        default: false
    }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);