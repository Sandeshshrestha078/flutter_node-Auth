const express = require('express')
const authRoute = express.Router()
const User = require('./../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// signup route
authRoute.get('/',(req, res)=>{res.send('hello')})

authRoute.post('/api/signup',async (req, res)=>{
    try{
        const {name, email, password} = req.body
    
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({
                msg: 'User with same email already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 8)
        
        let user = new User({
            name,
            email,
            password: hashedPassword
        })
        user = await user.save()
        res.json(user)

    }
    catch(e){
        res.status(500).json({error: e.message})

    }
})


// sign in route

authRoute.post('/api/sigin',async(req, res)=>{
    try{
        const {email , password} = req.body
    
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: 'User with this email does not exist'})
        }
    
        const matchPassword = await bcrypt.compare(password , user.password)
        if(!matchPassword){
           return res.status(400).json({msg: "Invalid Password"})
        }
        
        // creating token
        const payload = {id : user._id}
        const secretKey = 'mysecret@key'
    
        const token  = jwt.sign(payload, secretKey)
        res.json({token , ...user._doc})
    }
    catch(e){
        res.json({error:e.message})
    }

})


module.exports = authRoute