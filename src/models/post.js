const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        max: 100
    },
    image: {
        type: String,
        required: true,
        trim: true,
        max: 255
    },
    body: {
        type: String,
        trim: true,
        default: false
    }
}, 
{
    timestamps: true
});
PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);