const mongoose = require('mongoose');
const FilmSchema = new mongoose.Schema({
  name: {
    type: String,
  },


  title:{

    type: String

    },

   tags:[{type:String}],

   image:{
secure_url:String,
public_id:String

   },

   desc:{
type:String

   },


    createdAt: {

        type: Date,
        default: Date.now

    },

    oyuncular:[{type:String}],

    fragmentURL:{

        type:String

    },
    
    FilmShows:[{type:mongoose.Schema.Types.ObjectId, ref:'FilmShow'}]



});

module.exports = mongoose.model('Film', FilmSchema);