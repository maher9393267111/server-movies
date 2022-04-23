const mongoose = require('mongoose');
const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
  },


  title:{

    type: String

    },

    categoryBlogs:[

    {type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}

    ],


    createdAt: {

        type: Date,
        default: Date.now

    },




});

module.exports = mongoose.model('category', sectionSchema);