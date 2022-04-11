
const express =require('express')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')
const { signup, signin, registration,requireSignin } = require('../../controllers/admin/auth')
const { isRequestValidated, validateSignupRequest } = require('../../validtor/auth')

const router = express.Router()


router.post('/admin/signin',signin)

router.post('/admin/signup',validateSignupRequest,isRequestValidated, signup) 



router.get('/admin/registration',registration)



module.exports= router;  