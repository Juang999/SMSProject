const jwt = require('jsonwebtoken')
const path = require('path');
const {parsed: config} = require('dotenv').config({path: path.resolve('./.env')})
const {
    User, Role,
    UserHasRole,
    Sequelize, sequelize
} = require('../../../models')
const {Auth} = require('../../../helper/helper.js')
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = config

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
            res.status(401)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    register = async (request) => {
        try {
            
        } catch (error) {
            
        }
    }

    getUser = (req, res) => {
        let searchname = (req.query.searchname) ? req.query.searchname : '';

        User.findAll({
            attributes: [
                'id',
                'username',
                'is_active',
                'teacher_id',
                [Sequelize.literal('CASE WHEN teacher_id IS NOT NULL THEN true ELSE false END'), 'status_teacher'],
                'student_id',
                [Sequelize.literal('CASE WHEN student_id IS NOT NULL THEN true ELSE false END'), 'status_student'],
                [Sequelize.literal('"user_has_role->detail_role"."role_name"'), 'role_name'],
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: UserHasRole,
                    as: 'user_has_role',
                    attributes: [],
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
                username: {
                    [Op.iLike]: `%${searchname}%`
                }
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                });
        });
    }

    getDetailUser = (request) => {
        
    }
}

module.exports = new AuthController()