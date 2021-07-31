const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    details: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },

});

const News = mongoose.model("blog", blogSchema);
module.exports = blog;