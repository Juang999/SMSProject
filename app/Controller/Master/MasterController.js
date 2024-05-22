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
                'code_name'
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

    formCode = async (field) => {
        let totalData = await CodeMaster.count({where: {code_field: field}})

        return `${field.toUpperCase()}${totalData + 1}`
    }
}

module.exports = new MasterController()