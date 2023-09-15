const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(authRoute)




const DB = mongoose.connect("mongodb+srv://sandesh:yU6IdDWokDHNOddW@cluster0.3r6rfjy.mongodb.net/auth").then(()=>{
    console.log('connection successful')
}).catch((e)=>{
    console.log(e)
})




app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})