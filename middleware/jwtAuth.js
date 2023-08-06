const jwt = require("jsonwebtoken")

// vaidating the jwt token in the headers to Authorizing the user

const jwtTokenvalidator = async (req, res, next) => {
 // acessing the token from the headers
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.json({
            code: "INVALID_VALUE",
            Message: "The provided value is not valid or missing."
        });
    }


    try {
        //sliting the token fron the bearer
        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer') {
            return res.json({
                code: "INVALID_VALUE",
                Message: "The provided value is not valid or missing."
            });
        }
        //verifying the token with private key
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
            if (err) {
                return res.json({
                    code: "INVALID_TOKEN",
                    Message: "Invalid access token provided."
                })
            }
            next()
        })

    } catch (error) {
        return res.json({
            code: "INTERNAL_ERROR",
            message: 'Internal server error occurred. Please try again later.'
        });
    }


}
module.exports = jwtTokenvalidator