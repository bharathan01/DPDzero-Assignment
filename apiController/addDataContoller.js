const db = require('../dbConnection/userInfo')
//adding the data to user_data table in db

const addData = (req, res) => {
  const { Key, value } = req.body
  if (!Key || !value) {
    return res.json({
      status: "error",
      code: "INVALID_REQUEST",
      message: "Invalid request. Please provide all required fields"
    });
  }
  
  const query = "INSERT INTO user_data (`Key`, value) VALUES (?,?)"
  db.query(query, [Key, value], (err, data) => {
    if (err) {
      return res.json(err)
    }
    const userData = { Key, value }
    return res.json({
      status: "success",
      message: "Data stored successfully."
    }

    )
  })
}

//retrive the data from the database using the key
const retrieveData = (req, res) => {
  const Key = req.params.key
  //checking the key is there or not
  if (!Key) {
    return res.status(400).json({ code: "KEY_NOT_FOUND", message: 'Invalid request. Missing key.' });
  }

  //checking the key weather the key is present or not
  const query = 'SELECT * FROM user_data WHERE `Key` = ?';
  db.query(query, [Key], (err, data) => {
    if (err) {
      return res.json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later."
      })
    }
    //if the key is not present then sent error
    if (data.length === 0) {
      return res.json({
        status: "error",
        code: "KEY_NOT_FOUND",
        message: "The provided key does not exist in the database."
      })
    }
    return res.json({ status: "success", data: data[0] })
  })
}


//upadating the data according to the key
const updateData = (req, res) => {
  const Key = req.params.key
  const value = req.body.value
  if (!Key) {
    return res.json({ code: "KEY_NOT_FOUND", message: 'Invalid request. Missing key.' });
  }
  const query = 'SELECT * FROM user_data WHERE `Key` = ?';
  db.query(query, [Key], (err, data) => {
    if (err) {
      return res.json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later."
      })
    }
    if (data.length === 0) {
      return res.json({
        status: "error",
        code: "KEY_NOT_FOUND",
        message: "The provided key does not exist in the database."
      })
    }

    //if the key is valid the only the value is update
    const updateQuery = 'UPDATE user_data SET value = ? WHERE `key` = ?';
    db.query(updateQuery, [value, Key], (err, data) => {
      if (err) {
        return res.json({
          status: "error",
          code: "INTERNAL_SERVER_ERROR",
          message: "An internal server error occurred. Please try again later."
        })
      }
      return res.json({
        status: "success",
        message: "Data updated successfully."
      }
      )
    })
  })
}
//deleting the data according to the key


const deleteData = (req, res) => {
  const Key = req.params.key
  console.log(Key)
  if (!Key) {
    return res.json({ code: "KEY_NOT_FOUND", message: 'Invalid request. Missing key.' });
  }
  const query = 'SELECT * FROM user_data WHERE `Key` = ?';
  db.query(query, [Key], (err, data) => {
    if (err) {
      return res.json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later."
      })
    }
    if (data.length === 0) {
      return res.json({
        status: "error",
        code: "KEY_NOT_FOUND",
        message: "The provided key does not exist in the database."
      })
    }
    const deleteQuery = 'DELETE FROM user_data WHERE `Key` = ?';
    db.query(deleteQuery, [Key], (err, data) => {
      if (err) {
        return res.json({
          status: "error",
          code: "INTERNAL_SERVER_ERROR",
          message: "An internal server error occurred. Please try again later."
        })
      }
      return res.json({
        status: "success",
        message: "Data deleted successfully."
      }
      )
    })
  })
}


module.exports = {
  addData,
  retrieveData,
  updateData,
  deleteData
}