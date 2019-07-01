const config = require('./config/dev')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001;  
const userRoutes = require('./routes/userRoute')
mongoose.connect(config.URI).then((err)=>{
  
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes)

app.listen(PORT, () =>{
    console.log(`Listening on https://localhost/${PORT}`)
})

