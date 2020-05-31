require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser =require('body-parser')
const cookieParser =require('cookie-parser')
const expressValidator = require('express-validator')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')

const app = express()

//conect to DB
mongoose.connect(   process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connected to database"))
.catch(err=>console.log("Could not connect to Mongo..",err))

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

app.use('/api',authRoute)
app.use('/api',userRoute)
app.use('/api',categoryRoute)
app.use('/api',productRoute)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})