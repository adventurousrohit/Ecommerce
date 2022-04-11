const mongoose= require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20           
        },
        lastName:{
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20        
        },
        username:{
            type: String,
            required: true,
            trime:true,
            unique: true,
            index: true,
            lowercase: true
        },
        email:{
            type: String,
            required: true,
            trime:true,
            unique: true,
            lowercase: true
        },
        hashPassword:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            enum:['user','admin'],
            default: "user"
        },
        contactNumber:{type:Number},
        profilePicture:{type:String}
       
    },
    {timestamps:true})


    userSchema.virtual("fullName")
    .set(function(){
        return  "${this.firstName} ${this.lastName}"
    }) 

    userSchema.virtual('password')
    .set(function(password){
        this.hashPassword =bcrypt.hashSync(password,10)
    })

    userSchema.methods = {
        authenticate: function(password){
            return bcrypt.compareSync(password , this.hashPassword)
        }
    }


    module.exports= new mongoose.model('User',userSchema);