const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
    },
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
});

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    content: {
        type: String,
        required: true,
    },
    content_pdf: {
        data: Buffer,
        type: String,
    },
    content_photo: {
        data: Buffer,
        type: String,
    },
    content_video: {
        data: Buffer,
        type: String,
    },
    
    like: likeSchema,

}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
