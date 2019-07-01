const userModel = require('../models/userModel')
// const passport = require('../passport')
const config = require('../config/dev')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.profile  = ()=>{}
exports.login = (req,res) =>{
    const email = req.body.email
    const password  = req.body.password
    if((!password) || (!email)){
        return res.status(422).send({errors:[{title:'Data Missing',detail:'Provide email and Password'}]})
    }
    userModel.findOne({email:email},(err,user)=>{
        if(err){
            res.status(422).send(err)
        }
        if(!user){
            res.status(422).send({message:'User does not exist!'})
            
        }
        async function checkUser(user,password){
            const match  = await bcrypt.compare(password, user.password);
            if(match){
                const token = jwt.sign({
                    userId:user.id,
                    username: user.username,
                },config.secret,{expiresIn:000160*2})
                res.status(200).send({title:'Logged In!',token:token})
            }
            else{
                res.status(422).send({message:'Password Incorrect'})
            }
        }
        let object = {}
        checkUser(user,password)    
    })
    
}

exports.register = (req,res) =>{
    const {username,email,password,confirmPassword} = req.body
    if((!password)||(!email)){
        return res.status(422).send({errors:[{title:'Data Missing',detail:'Provide Email and Password'}]})
    }
    if(password!=confirmPassword){
        return res.status(422).send({errors:[{title:"Invalid Password",detail:'Password is not same as Confirm PassWord'}]})
    }
    
    
    userModel.findOne({email:email},(err,existingUser)=>{
        if(err){
            return res.status(422).send(err)
        }
        if(existingUser){
            return res.status(422).send({errors:[{title :'Invalid email',detail:'Email already exists'}]})
        }
        var user = new userModel(req.body)
        bcrypt.hash(user.password, 10, function(err, hash) {
            if(err){
                return res.status(422).send({title:'Password not Hashed!',detail:err})
            }
            user.password = hash;
          
            user.save((err)=>{
                if(err){
                    return res.status(422).send({title: 'MongoDB Error!',detail:err})
                }
                return res.json({'registered':true})
            })
        
        })

      
    })
}