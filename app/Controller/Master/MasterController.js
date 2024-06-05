const {CodeMaster, Sequelize} = require('../../../models')

class MasterController {
    store = async (req, res) => {
        try {
            let dataCodeMaster = await CodeMaster.create({
                code_field: req.body.code_field,
                code_code: await this.formCode(req.body.code_field),
                code_name: req.body.code_name,
                code_description: req.body.code_description,
                code_is_active: true
            })
    
            res.status(200)
                .json({
                    status: 'success',
                    data: dataCodeMaster,
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

    getFieldCodeMaster = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                [Sequelize.literal('DISTINCT(code_field)'), 'code_field']
            ],
            order: [
                ['code_field', 'ASC']
            ]
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    update = async (req, res) => {
        try {
            let {status, data} = await this.checkExistanceData(req.params.id);
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    });

                return;
            }

            let {code_code, code_field, code_name, code_description, code_is_active} = this.requestUpdate(req.body, data);

            let result = await CodeMaster.update({
                code_code,
                code_field,
                code_name,
                code_description,
                code_is_active,
            }, {
                where: {
                    id: req.params.id
                }
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
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

    delete = async (req, res) => {
        try {
            let {status} = await this.checkExistanceData(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })
    
                return;
            }
    
            let result = await CodeMaster.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
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

    requestUpdate = (request, dataCodeMaster) => {
        return {
            code_code: (request.code_code) ? request.code_code : dataCodeMaster.code_code,
            code_field: (request.code_field) ? request.code_field : dataCodeMaster.code_field,
            code_name: (request.code_name) ? request.code_name : dataCodeMaster.code_name,
            code_description: (request.code_description) ? request.code_description : dataCodeMaster.code_description,
            code_is_active: (request.code_is_active) ? request.code_is_active : dataCodeMaster.code_is_active,
        }
    }

    checkExistanceData = async (id) => {
        let result = await CodeMaster.findOne({
            where: {
                id: id
            }
        })

        return {
            status: (result) ? true : false,
            data: (result) ? result.dataValues : null
        }
    }

    getDataClassType = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'type']
            ],
            where: {
                code_field: 'class-type'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    getClassName = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'class']
            ],
            where: {
                code_field: 'class-name'
            }
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: result,
                        error: null
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'failed',
                        data: null,
                        error: err.message
                    })
            })
    }

    getClassGrade = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'grade']
            ],
            where: {
                code_field: 'grade'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    getSemester = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'semester']
            ],
            where: {
                code_field: 'semester'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    getLocation = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'location']
            ],
            where: {
                code_field: 'location'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    getTeacherType = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'teacher_type']
            ],
            where: {
                code_field: 'teacher-type'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    getStatus = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'status']
            ],
            where: {
                code_field: 'status'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    getLessonType = (req, res) => {
        CodeMaster.findAll({
            attributes: [
                'id',
                ['code_name', 'lesson_type']
            ],
            where: {
                code_field: 'lesson-type'
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    formCode = async (field) => {
        let totalData = await CodeMaster.count({where: {code_field: field}})

        return `${field.toUpperCase()}${totalData + 1}`
    }
}

module.exports = new MasterController()