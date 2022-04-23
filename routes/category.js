const BlogModel = require('../models/blog');
const cloudinary = require('cloudinary');
const sectionModel = require('../models/section');
const categoryModel = require('../models/category');
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



//create Category




router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, title } = req.body;
     //   const image = req.file;
       // const imageUrl = await cloudinary.v2.uploader.upload(image.path);
        const newCategory = new categoryModel({
            name,
            title,
            // sectionMainDescription,
            // urls,
            // image: imageUrl,
        });
        await newCategory.save();
        res.status(200).json({
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Category',
            error: error.message,
        });
    }
});

//get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.status(200).json({
            message: 'All blogs',
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error getting blogs',
            error: error.message,
        });
    }
});

//get one blog
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        res.status(200).json({
            message: 'Blog found',
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error getting blog',
            error: error.message,
        });
    }
});

//update blog
// router.put('/:id', upload.single('image'), async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, title, sectionMainDescription, urls } = req.body;
//         const image = req.file;






module.exports = router;
