const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required : true,
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("post", postSchema);