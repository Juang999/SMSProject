const {parsed: config} = require('dotenv').config({path: '../.env'});

const {User, UserHasRole, Role, Sequelize} = require('../models')
const {compare, compareSync} = require('bcrypt')
const Bcrypt = require('./Bcrypt');
const {get} = require('express-http-context');
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET} = config;

class Auth {
    attempt = async (request) => {
        let dataUser = await this.findUser(request.username)

        if (dataUser == null) return {status: false, data: null}

        let RESULT_CHECK_PASSWORD = this.checkPassword(request.password, dataUser.password)

        return {
            status: (RESULT_CHECK_PASSWORD) ? true : false,
            data: (RESULT_CHECK_PASSWORD) ? dataUser : []
        }
    }

    checkPassword = (realPassword, hashedPassword) => {
        return compareSync(realPassword, hashedPassword);
    }

    findUser = async (username) => {
        let dataUser = await User.findOne({
            attributes: [
                'id',
                'username',
                'password',
                'student_id',
                'teacher_id',
                [Sequelize.literal('`user_has_role`.`role_id`'), 'role_id'],
                [Sequelize.literal('`user_has_role->detail_role`.`role_name`'), 'role_name']
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
                username: username
            },
            logging: false
        })

        return (dataUser) ? {
            id: Bcrypt.AESEncrypt(dataUser.dataValues.id),
            username: dataUser.dataValues.username,
            password: dataUser.dataValues.password,
            student_id: dataUser.dataValues.student_id,
            teacher_id: dataUser.dataValues.teacher_id,
            role_id: Bcrypt.AESEncrypt(dataUser.dataValues.role_id),
            role_name: dataUser.dataValues.role_name,
        } : null;
    }

    user = async () => {
        const {id} = jwt.verify(get('token'), ACCESS_TOKEN_SECRET);

        let {dataValues} = await User.findOne({
            where: {
                id: Bcrypt.AESDecrypt(id)
            }
        });

        return dataValues;
    }
}

module.exports = new Auth()