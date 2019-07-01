const mongoose = require('mongoose')

const Schema= mongoose.Schema

const userSchema = new Schema ({
    username:{
        type: String,
        min:[4,'Username is too Short!'],
        max:[32,'Username is too long']
    },
    email:{
        type:String,
        min:[4,'Email is too Short!'],
        max:[32,'Email is too long'],
        unique: true,
        lowercase:true,
        required:'Email is required',
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type:String, 
        min:[4,'Password is too Short!'],
        max:[32,'Password is too long'],
        required:'Password is required'
    }
})
module.exports = mongoose.model('user',userSchema)