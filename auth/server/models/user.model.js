const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        validate:{
            validator: (value)=>{
                const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(reg)
            },
            message: "Please enter a valid email" 
        }
    }

})

const User = mongoose.model("User", userSchema)
module.exports = User