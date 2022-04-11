const jwt = require('jsonwebtoken')

//jwt decode
exports.requireSignin = (req,res,next)=>{
    console.log(req.headers.authorization)
    if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const user = jwt.verify(token,"secret")
    req.user=user
    console.log(user)
    next()
    }else{
    return res.status(400).json({message:"Authrization required"})}
    
}

exports.userMiddleware = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(400).json({message:'user Access denied!'})
    }
    next()
    
}

exports.adminMiddleware = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({message:'Admin Access denied!'})
    }
    next()
    
}
