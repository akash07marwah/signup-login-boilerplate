const config = require('./config/dev')
const session = require('express-session')
// const passport = require('./passport')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001;  
const userRoutes = require('./routes/userRoute')

mongoose.connect(config.URI, {useNewUrlParser: true, useCreateIndex: true}).then((err)=>{
  
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session(
    {
       secret : config.secret,
       saveUninitialized:false,
       resave:true

    }
))
// app.use(passport.initialize())
// app.use(passport.session())
app.use('/users',userRoutes)
app.use('/',express.static(__dirname+"/public"))
app.listen(PORT, () =>{
    console.log(`Listening on https://localhost/${PORT}`)
})

