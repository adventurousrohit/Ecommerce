const User = require('../models/user')
const jwt = require('jsonwebtoken')
const{validationResult}= require('express-validator')


exports.signup = (req,res)=>{
    // const errors = validationResult(req)
    // return res.status(400).json({errors:errors.array()})
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user)
             return res.status(400).send({
                messgage: 'User already exist'
            })
            const{
                firstName,
                lastName,
                email,
                password,
            }= req.body

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });

            _user.save()
            .then(result=>{
                res.status(201).json({message:'User created succesfully'})
                console.log(_user)
            }).catch(err=>{
                console.log(err)
            })
        

    })
}

exports.signin = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error)return res.status(400).json({error})
        if(user){
            if(user.authenticate(req.body.password)){
                  const token = jwt.sign({_id: user._id, role: user.role}, "secret",{expiresIn:"1h"})
                  const {firstName,lastName,email,role} =user
                  const fullName = firstName + lastName
                  res.status(200).json({
                      token,
                      user:{firstName,lastName,role,email,fullName}
                  })
            }else{
                return res.status(400).json({
                    message: "Invalid Password"
                })
            }
        }else{
            res.status(404).json({
                message: "something went wrong"
            })
        }
    })
}

exports.registration = async (req, res) => {
    try {
        const userData = await User.find()
        res.status(201).send(userData)
    } catch (e) {
        console.log(e)
    }
}

