const express = require('express')
const { connect } = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const userRoute = require('./router/auth')
const adminRoute = require('./router/admin/auth')
const categoryRoute = require('./router/category')
const productRoute = require('./router/product')
const cartRoute = require('./router/cart')
const path = require('path')
const port = process.env.PORT ||3000

dotenv.config()
app.use(express.json())


// mongoose connection
mongoose.v=connect('mongodb+srv://studentregistrtion:Rohit123@cluster0.r1buw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    console.log("connection is succceful")
}).catch((e)=>{
    console.log(e)
})


// sever connection
app.listen( port,()=>{
    console.log(`server is on port number ${port}`)
})

app.use("/public",express.static(path.join(__dirname,"uploads")))
app.use(userRoute)
app.use(adminRoute)
app.use(categoryRoute)
app.use(productRoute)
app.use(cartRoute)
module.exports = app;
