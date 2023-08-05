const db = require('../dbConnection/userInfo')

const userData = (req,res) =>{
   
   const q = `SELECT * FROM user`
      db.query(q,(err,data) =>{
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json({data})
    })
}
 
const addUser = (req,res) =>{
    const{user_id,username,email,password,full_name,age,gender} = req.body
   const q = `INSERT INTO user (user_id,username,email,password,full_name,age,gender) VALUES (?,?,?,?,?,?)`

  db.query(q,[
    user_id,
    username,
    email,
    password,
    full_name,
    age,
    gender
  ],(err,data) =>{
    if(err){
        console.log(err)
       return res.json(err)
    }
    console.log(data)
    return res.json({message:'sucess',data})
  })
}
module.exports = {
    userData,
    addUser
}