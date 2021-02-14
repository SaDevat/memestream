import mongoose from 'mongoose';

const memeSchema = mongoose.Schema({
    title: String,
    message: String,
    url: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var MemeMessage = mongoose.model('MemeMessage', memeSchema);

export default MemeMessage;