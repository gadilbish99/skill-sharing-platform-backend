const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        max: 100
    },
    image: {
        type: String,
        required: true,
        max: 255
    },
    body: {
        type: String,
        default: false
    }
});
PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);