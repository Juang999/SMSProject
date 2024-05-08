const {User} = require('../models')
const {compare, compareSync} = require('bcrypt')

class Auth {
    static attempt = async (request) => {
        let dataUser = await User.findOne({
            attributes: [
                'id',
                'username',
                'password',
                'student_id',
                'teacher_id'
            ],
            where: {
                username: request.username
            }
        })

        return this.checkPassword(request.password, dataUser)
    }

    checkPassword = (realPassword, hashedPassword) => {
        let RESULT_STATUS_PASSWORD = compareSync(realPassword, hashedPassword)

        if (RESULT_STATUS_PASSWORD == true) {
            throw new Error('ups anda menggunaakan fitur ini!')
        } else {
            return true
        }
    }
}

module.exports = new Auth()