const express= require('express')
const Category = require('../models/category')
const slugify = require('slugify')
const { addCategory, getCategory } = require('../controllers/category')
const { requireSignin, adminMiddleware } = require('../common-middleware')
const { createProducts } = require('../controllers/product')
const multer  = require('multer')
const shortid= require('shortid')
const path = require('path')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() +'-'+ file.originalname)
    }
  })
  const upload= multer({storage})

router.post('/product/create',requireSignin,adminMiddleware,upload.array("productPic"), createProducts, )



// router.get('/category/getcategory',getCategory,)

module.exports= router; 