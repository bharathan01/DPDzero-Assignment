const express = require('express')
const {userData,addUser} = require("../apiController/usercontrolles")
const routes = express.Router()

routes.get('/',userData)
routes.post('/',addUser)


module.exports = routes


