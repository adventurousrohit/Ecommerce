const express= require('express')
const Category = require('../models/category')
const slugify = require('slugify')
// const {  } = require('../controllers/category')
const { requireSignin, userMiddleware } = require('../common-middleware')
const { addItmToCart } = require('../controllers/cart')
const router = express.Router()

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItmToCart,)

module.exports= router; 