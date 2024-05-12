require('dotenv').config()

const jwt = require('jsonwebtoken')
const {User} = require('../../../models')
const {Auth} = require('../../../helper/helper.js')
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env

class AuthController {
    login = async (req, res) => {
        try {
            let {status, data} = await Auth.attempt(req.body)
            
            if (status == false) {
                res.status(300)
                    .json({
                        status: 'unauthorize!',
                        data: null,
                        error: 'incorrect username or password!'
                    })

                return
            }

            let token = jwt.sign(data, ACCESS_TOKEN_SECRET, {expiresIn: '24h'})

            res.status(200)
                .json({
                    status: 'success',
                    data: {
                        type: 'bearer',
                        token: token
                    },
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }
}

module.exports = new AuthController()