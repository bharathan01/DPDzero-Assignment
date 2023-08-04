const express = require('express')
require("dotenv").config()

const app = express()
app.use(express.json())




app.listen(process.env.PORT_NO,() =>{
    console.log("Server running at the port",process.env.PORT_NO)
})