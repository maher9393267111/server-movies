const BlogModel = require("../models/blog");
const cloudinary = require("cloudinary");
const sectionModel = require("../models/section");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// multer
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const express = require("express");
const router = express.Router();

// create section if section have image file path save image else save image else save image save it without image

const createSection = async (req, res) => {
  const body = req.body;

  const section = new sectionModel({
    name: body.name ? body.name : null,

    title: body.title,

    objects: body.objects,

    sectionMainDescription: body.sectionMainDescription,
  });


  // seperate req.body in section create

  // const section = new sectionModel({

  //   ...body,

  // });





  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    section.image = {
      public_id: result.public_id,

      secure_url: result.secure_url,
    };

    // then push image to section before save it

    section.image.secure_url = result.secure_url;

    section.image.public_id = result.public_id;

    section.save();
    // if not have file path save it without image
  } else {
    section.image = {
      public_id: "",

      secure_url: "",
    };

    section.save();
  }

  res.status(200).json({ message: "section created successfully", section });



};




router.post("/create-section", upload.single("image"), createSection);


module.exports = router;