const db = require('../dbConnection/userInfo')

// meddileware validate the user input data wheather its meet the requirements

const validateUser = (req, res, next) => {
    const { username, email, password, full_name, age, gender } = req.body

    //checkig the req fiels are not empty
    if (!username || !email || !password || !full_name || !age || !gender) {
        return res.json({
            status: "error",
            code: "INVALID_REQUEST",
            message: "Invalid request. Please provide all required fields"
        });
    }

    // checking the username in the database it already persent or not
    if (username) {
        const sql = 'SELECT * FROM user WHERE username = ?';
        db.query(sql, [username], (err, data) => {
            if (err) {
                return res.json(err)
            }
            if (!data.length == 0) {
                console.log(data)
                if (data[0].username === username) {
                    res.json({
                        status: "errord",
                        code: "USERNAME_EXISTS",
                        message: "Invalid request. Please provide all required fields:username, email, password, full_name."
                    })
                }
            }
        })

    }
    // checking the email in the database it already persent or not
    if (email) {
        const sql = 'SELECT * FROM user WHERE email = ?';
        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.json(err)
            }
            if (!data.length == 0) {
                if (data[0].email === email) {
                    res.json({
                        status: "errord",
                        code: "email_EXISTS",
                        message: "The provided email is already registered. Please use a different email address."
                    })
                }
            }
        })

    }
    //validating the password is meet the requirements

    if (!/(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        return res.json({
            status: "error",
            code: "INVALID_PASSWORD",
            message: "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."
        })
    }
    //validating the age is positive
    if (!Number.isInteger(age) || age < 0) {
        return res.json({
            status: "error",
            code: "INVALID_AGE",
            message: "Invalid age value. Age must be a positive integer."
        })
    }
    //validating the gender
    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
        return res.json({
            status: "error",
            code: "GENDER_REQUIRED",
            message: "Gender field is required. Please specify the gender (e.g., male, female, non-binary)."
        })
    }
    next()


}

module.exports = validateUser