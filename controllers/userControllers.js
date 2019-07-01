const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
exports.login = () =>{}
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