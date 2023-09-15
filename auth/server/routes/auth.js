const express = require('express')
const authRoute = express.Router()
const User = require('./../models/user.model')
const bcrypt = require('bcryptjs')

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



module.exports = authRoute