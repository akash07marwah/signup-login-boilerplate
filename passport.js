const passport = require('passport')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy

const  { userModel }  = require('./models/userModel')

passport.use(new localStrategy(
     async (email,password)=>{
         try{
             console.log('Hello')
        await userModel.findOne({email:email},(err,user)=>{
         if(err){ 
             console.log(err)
              return res.send(err)
            }   
         if(!user){console.log('Does not exist') 
             return res.send({message:'No such User Exists!'})
            }
         bcrypt.compare(password,user.password,(err,res)=>{
            if(res === false){
                console.log(err)
                res.send({message: 'Password do not match!'})
            }
        })
        })
        console.log(user)
        return res.send(user)

    }
    catch (err){
        console.log(err)
        return res.send(err)
    }
    }    
))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((email,done)=>{
    user.findOne({
        email:email
    })
    .then((user)=>
    {done(null,user)
    })
    .catch(done)
})
module.exports = passport
