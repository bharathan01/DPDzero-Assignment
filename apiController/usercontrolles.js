const db = require('../dbConnection/userInfo')
const jwt = require("jsonwebtoken")


//inserting the register user data to user teable
const addUser = (req,res) =>{
  const{username,email,password,full_name,age,gender} = req.body
  const query = `INSERT INTO user (username,email,password,full_name,age,gender) VALUES (?,?,?,?,?,?)`
  db.query(query,[
    username,
    email,
    password,
    full_name,
    age,
    gender
  ],(err,data) =>{
    if(err){
        return res.json(err)
     }
     const userData = {username, email,full_name,age,gender}
    return res.json({
      status: "success",
      message: "User successfully registered!",
      data:userData
    }
    
    )
  })
}
//accessing the token by the Authorized user
getToken =(req,res) =>{
  const {username,password} = req.body
  const query = `SELECT * FROM user WHERE username = ? AND password = ?`;
  //checking the username and password in the request body
  db.query(query,[username,password],(err,data) =>{

    if(err){
      return res.json({status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later."})
    }
    //if the user is not present send an error message
    if(data.length === 0){
      return res.json({status: "error",
      code: "INVALID_CREDENTIALS",
      message: "Invalid credentials. The provided username or password is incorrect."})
    }

    //sending the needfull in formation avoid sensitive info
    const userData = {
      user_id:data[0].user_id,
      username:data[0].username,
      email:data[0].email,
      full_name:data[0].full_name,
      age:data[0].age,
      gender:data[0].gender
    }

    //if the user is valid the create a jwt token for the user
    const jwtToken = jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:60*60})
    return res.json({
      status: "success",
      message: "Access token generated successfully.",
      data: {
        access_token: jwtToken,
        expires_in: 3600
      }
    })    

  })

}

module.exports = {
    addUser,
    getToken
}