const mongoose = require('mongoose');
const validator = require('validator');
const { hash, compare } = require('bcryptjs');

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
    refreshToken: {
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

userSchema.pre('save', async function (next) {
    try {
        const { email, password } = this;
        // Check if the user exist
        const user = await this.constructor.findOne({ email });
        if (user) 
            throw new Error('User already exist');
        // Hash the password
        if (this.isNew)
            this.password = await hash(password, 10);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.statics.findByCredentials = async function (credentials) {
    const { email, password } = credentials;
    // 1. Find user in array. If not exist send error
    const user = await this.findOne({ email });
    if (!user) 
      throw new Error('Incorrect email address or password');
    // 2. Compare crypted password and see if it checks out. Send error if not
    const valid = await compare(password, user.password);
    if (!valid) 
      throw new Error('Incorrect email address or password');

    return user;
}

module.exports = mongoose.model('User', userSchema);