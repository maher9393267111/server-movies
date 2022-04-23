const mongoose = require('mongoose');
const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
  },

title:{
    type: String
},

objects:[ 

{title:{type:String},
subdesc:{type:String},
}


],
  sectionMainDescription: {
    type: String,
  },
  image:{
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

module.exports = mongoose.model('Section', sectionSchema);