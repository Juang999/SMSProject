const {User, UserHasRole, Role, Sequelize} = require('../models')
const {compare, compareSync} = require('bcrypt')

class Auth {
    attempt = async (request) => {
        let dataUser = await this.findUser(request)

        if (dataUser == null) return {status: false, data: null}

        let RESULT_CHECK_PASSWORD = this.checkPassword(request.password, dataUser.dataValues.password)

        return {
            status: (RESULT_CHECK_PASSWORD == true) ? true : false,
            data: (RESULT_CHECK_PASSWORD) ? dataUser.dataValues : []
        }
    }

    checkPassword = (realPassword, hashedPassword) => {
        return compareSync(realPassword, hashedPassword)
    }

    findUser = async (request) => {
        let dataUser = await User.findOne({
            attributes: [
                'id',
                'username',
                'password',
                'student_id',
                'teacher_id',
                [Sequelize.literal('"user_has_role"."role_id"'), 'role_id'],
                [Sequelize.literal('"user_has_role->detail_role"."role_name"'), 'role_name']
            ],
            include: [
                {
                    model: UserHasRole,
                    as: 'user_has_role',
                    atttributes: [],
                    include: [
                        {
                            model: Role,
                            as: 'detail_role',
                            attributes: []
                        }
                    ]
                }
            ],
            where: {
                username: request.username
            }
        })

        return dataUser
    }
}

module.exports = new Auth()