const {CodeMaster, Sequelize} = require('../../../models')

class MasterController {
    inputDataMaster = async (req, res) => {
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

    getFieldCodeMaster = () => {
        CodeMaster.findAll({
            attributes: [
                [Sequelize.literal('DISTINCT(code_field)'), 'code_field']
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

    formCode = async (field) => {
        let totalData = await CodeMaster.count({where: {code_field: field}})

        return `${field.toUpperCase()}${totalData + 1}`
    }
}

module.exports = new MasterController()