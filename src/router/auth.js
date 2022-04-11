
const express =require('express')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose');
const { requireSignin } = require('../common-middleware');
const { signup, signin, registration } = require('../controllers/auth');
const {  isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validtor/auth');

const router = express.Router()


router.post('/signin',validateSigninRequest,isRequestValidated,signin)

router.post('/signup',validateSignupRequest,isRequestValidated,signup) 

// router.post('/profile',requireSignin ,(req,res)=>{
//     res.status(200).json({ user:'profile'})
// })

router.get('/registration',registration)



module.exports= router;  