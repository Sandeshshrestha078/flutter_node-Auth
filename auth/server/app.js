const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const SecretKey = require('./secret')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(authRoute)




const DBconn = SecretKey.DBconn




app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})