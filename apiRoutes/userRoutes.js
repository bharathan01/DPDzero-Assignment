const express = require('express')
const {addUser,getToken} = require("../apiController/usercontrolles")
const {addData,retrieveData,updateData,deleteData} = require("../apiController/addDataContoller")
const jwtTokenvalidator = require("../middleware/jwtAuth")
const validateUser = require('../middleware/userRegisterFieldsValidate')
const routes = express.Router()

// the main routes are kept here
routes.post('/register', validateUser,addUser)
routes.post('/token',getToken)

routes.post('/data', jwtTokenvalidator,addData)
routes.get('/data/:key' ,jwtTokenvalidator,retrieveData)
routes.put('/data/:key', jwtTokenvalidator,updateData)
routes.delete('/data/:key',deleteData)

 
module.exports = routes


