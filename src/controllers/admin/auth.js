const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const user = require('../../models/user')


exports.signup = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user)
             return res.status(400).send({
                messgage: 'Admin already exist'
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
                username: Math.random().toString(),
                role: "admin"
            });

            _user.save()
            .then(result=>{
                res.status(201).json({message:'admin created succesfuly'})
                console.log(_user)
            }).catch(err=>{
                res.status(401).json({message:"something went wrong"})
                console.log(err)
            })

    })
}

exports.signin = (req,res)=>{
    user.findOne({email:req.body.email,role:"admin"} )
    .exec((error,user)=>{
        if(error)return res.status(400).json({error})
        if(user){
            if(user.authenticate(req.body.password)){
                  const token = jwt.sign({_id: user._id,role:user.role}, "secret",{expiresIn:"1h"})
                  const {_id,firstName,lastName,email,role} =user
                  const fullName = firstName + lastName
                  res.status(200).json({
                      token,
                      user:{_id,firstName,lastName,role,email,fullName}
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
 