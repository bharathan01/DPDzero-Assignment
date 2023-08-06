
// importing the require modules
//sensitive data are kept in .env file
const express = require('express')
require("dotenv").config()
const db = require('./dbConnection/userInfo')
const routes = require('./apiRoutes/userRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')


//initializing the app,cors,and also api path and bodyparser

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/POST/api',routes)



//connecting mySQL server
const dbConnect = async() =>{
    try {
      db.connect(() =>{
        console.log("database connected..")
      })
     
    } catch (error) {
      console.log(err)
    }
  }
dbConnect()


// create an express server
app.listen(8080,() =>{
    console.log("Server running at the port",process.env.PORT_NO)
})