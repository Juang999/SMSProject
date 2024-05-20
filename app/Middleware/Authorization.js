require('dotenv').config()

const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET} = process.env
const {Auth, Bcrypt} = require('../../helper/helper.js')
const {User} = require('../../models')

let checkUserById = async (id) => {
    let decryptedId = Bcrypt.AESDecrypt(id);

    let dataUser = await User.findOne({
        where: {
            id: decryptedId
        }
    })

    return (dataUser) ? true : false;
}

let Authorization = async (req, res, next) => {
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
                    code: 400,
                    status: 'failed',
                    error: err.message
                });

            return;
        }

        if (checkUserById(user.id) == false) {
            res.status(400)
                .json({
                    code: 400,
                    status: 'failed',
                    error: err.message
                });

            return;
        }

        next();
    })
}

module.exports = Authorization;