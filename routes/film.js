const doctorModel = require('../models/blog');
const cloudinary = require('cloudinary');
const sectionModel = require('../models/section');
const filmModel = require('../models/film');
const filmShowInModel = require('../models/filmShowIn');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
// multer
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

const express = require('express');
const router = express.Router();


// create new film 

const createFilm = async (req, res) => {

const { name, title, tags, oyuncular, fragmentURL,desc,created_at } = req.body;

console.log(req.body, 'req.body');
const film = new filmModel({    

    name,
    title,
    tags,
    oyuncular,
    fragmentURL,
    desc,
    created_at,
    FilmShows:[]

});

try {


// upload image to cloudinary


const result = await cloudinary.v2.uploader.upload(req.file.path);


// add cloudinary url for the image to the campground object under image property


film.image = {

    secure_url: result.secure_url,

    public_id: result.public_id


};


    await film.save();
    res.status(201).json(film);
} catch (e) {
    res.status(400).json(e);
}

}


// create show in film


const createShowInFilm = async (req, res) => {





    const { film_id, placeName, showDay, showTime, salonNumber } = req.body;

console.log(req.body.placeName, 'req.body');

    const filmShowIn = new filmShowInModel({

        film_id,

        placeName,

        showDay,

        showTime,

        salonNumber

    });



    try {

        await filmShowIn.save();

// after creat show film update film show in array

         const film = await filmModel.findById(film_id);

         console.log(film, 'film');



 await film.updateOne({$push: {FilmShows: filmShowIn._id}});







        res.status(201).json({  success: "show-in created successfully",filmShowIn});

    } catch (e) {

        res.status(400).json(e);

    }




}


 // get film by id and film show in by film id


const getFilmById = async (req, res) => {

    try {

        const film = await filmModel.findById(req.params.id).populate('FilmShows', 'placeName salonNumber showDay showTime');

        res.status(200).json(film);

    } catch (e) {

        res.status(400).json(e);

    }



}



// all films


const getAllFilms = async (req, res) => {


    try {

        const films = await filmModel.find().populate('FilmShows', 'placeName salonNumber showDay showTime');

        
        res.status(200).json(films);

    } catch (e) {

        res.status(400).json(e);

    }



}






router.post('/create-film', upload.single('image'), createFilm);



// create show in film

router.post('/create-show-in-film', createShowInFilm);



//filmbyid route

router.get('/film/:id', getFilmById);


// all films

router.get('/allfilms', getAllFilms);


module.exports = router;





