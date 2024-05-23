require('dotenv').config()

const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET} = process.env
const {Bcrypt} = require('../../helper/helper.js')

let checkRoleById = (id) => {
    let decryptedRoleId = Bcrypt.AESDecrypt(id);

    return (decryptedRoleId == 3) ? true : false;
}

let TeacherMiddleware = async (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(400)
            .json({
                status: 'failed',
                message: "unauthorize",
                error: "unauthorize"
            });

        return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                });

            return;
        }

        if (checkRoleById(user.role_id) == false) {
            res.status(300)
                .json({
                    status: 'unauthenticate',
                    data: null,
                    error: 'unauthenticate'
                });

            return;
        } 

        next();
    })
}

module.exports = TeacherMiddleware;