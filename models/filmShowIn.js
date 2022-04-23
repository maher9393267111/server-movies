const mongoose = require('mongoose');
const filmShowSchema = new mongoose.Schema({
 placeName: {

        type: String,

    },


  showDay:{

    type: String

    },

    salonNumber:{

    type: Number

    },

    showTime:[{type:String}],


    created_at: {

        type: Date,
        default: Date.now

    },


    film_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' },



});

module.exports = mongoose.model('FilmShow', filmShowSchema);