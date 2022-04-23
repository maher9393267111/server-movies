const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
  },


  sectionSchema:[

{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}

  ],

category:{

type: mongoose.Schema.Types.ObjectId, ref: 'Category'

},
  


title:{
    type: String
},
  Maindescription: {
    type: String,
  },
  Mainimage:{
    public_id: String,

    secure_url: String,

  },
  urls: [
    {
        name: String,
        url: String,
    },
],
    createdAt: {

        type: Date,
        default: Date.now

    },




});

module.exports = mongoose.model('Blog', BlogSchema);