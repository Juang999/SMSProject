const {
    Teacher
} = require('../../../models')
const {Op} = require('sequelize')

class TeacherController {
    index = (req, res) => {
        let searchName = req.query.searchname

        Teacher.findAll({
            attributes: [
                'id',
                'fullname',
                'is_active',
                'photo'
            ],
            where: {
                fullname: {
                    [Op.iLike]: `%${searchName}%`
                }
            },
            order: [
                ['id', 'ASC']
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

    createDataTeacher = async (req, res) => {
        try {
            let dataTeacher = await Teacher.create({
                fullname: req.body.fullname,
                start_date: req.body.start_date,
                is_active: (req.body.is_active) ? (req.body.is_active == 1) ? true : false : false,
                end_date: (req.body.end_date) ? req.body.end_date : null,
                province: (req.body.province) ? req.body.province : null,
                regency: (req.body.regency) ? req.body.regency : null,
                sub_regency: (req.body.sub_regency) ? req.body.sub_regency : null,
                address: (req.body.address) ? req.body.address : null,
                email: (req.body.email) ? req.body.email : null,
                phone_number_1: (req.body.phone_number_1) ? req.body.phone_number_1 : null,
                phone_number_2: (req.body.phone_number_2) ? req.body.phone_number_2 : null,
                photo: (req.body.photo) ? req.body.photo : null
            })

            return dataTeacher;
        } catch (error) {
            throw new Error('ups telah terjadi error')
        }
    }

    show = async (id) => {
        let {data, status} = await this.checkDataTeacher(id)

        if (status == false) {
            return null
        }

        return data;
    }

    update = async (request, id) => {
        let {data: dataTeacher, status} = await this.checkDataTeacher(id);

        if (status == false) {
            return false;
        }

        let resultUpdateTeacher = await this.updateDataTeacher(request, dataTeacher, id)

        return resultUpdateTeacher;
    }

    updateDataTeacher = async (request, dataTeacher, id) => {
        let requests = await this.requestUpdateData(request, dataTeacher, id);

        let RESULT_UPDATE_DATE = await Teacher.update({
            fullname: dataTeacher['fullname'],
            start_date: dataTeacher['start_date'],
            is_active: dataTeacher['is_active'],
            end_date: dataTeacher['end_date'],
            province: dataTeacher['province'],
            regency: dataTeacher['regency'],
            sub_regency: dataTeacher['sub_regency'],
            address: dataTeacher['address'],
            email: dataTeacher['email'],
            phone_number_1: dataTeacher['phone_number_1'],
            phone_number_2: dataTeacher['phone_number_2'],
            photo: dataTeacher['photo'],
        }, {
            where: {
                id: id
            }
        })

        return RESULT_UPDATE_DATE;
    }

    /*
    *   create requests 
    */
    requestUpdateData = async (request, dataTeacher) => {
        let requests = {
            fullname: (request.fullname) ? request.fullname : dataTeacher.dataValues.fullname,
            start_date: (request.start_date) ? request.start_date : dataTeacher.dataValues.start_date,
            is_active: (request.is_active) ? request.is_active : dataTeacher.dataValues.is_active,
            end_date: (request.end_date) ? request.end_date : dataTeacher.dataValues.end_date,
            province: (request.province) ? request.province : dataTeacher.dataValues.province,
            regency: (request.regency) ? request.regency : dataTeacher.dataValues.regency,
            sub_regency: (request.sub_regency) ? request.sub_regency : dataTeacher.dataValues.sub_regency,
            address: (request.address) ? request.address : dataTeacher.dataValues.address,
            email: (request.email) ? request.email : dataTeacher.dataValues.email,
            phone_number_1: (request.phone_number_1) ? request.phone_number_1 : dataTeacher.dataValues.phone_number_1,
            phone_number_2: (request.phone_number_2) ? request.phone_number_2 : dataTeacher.dataValues.phone_number_2,
            photo: (request.photo) ? request.photo : dataTeacher.dataValues.photo,
        }

        return requests;
    }

    /*
    *   bellow function is to find the data
    *   when the data doesn't exist it will
    *   return 404 not found and it will
    *   return the data & status while
    *   exist
    */
    checkDataTeacher = async (id) => {
        let dataTeacher = await Teacher.findByPk(id);

        return (dataTeacher) ? {data: dataTeacher.dataValues, status: true} : {data: null, status: false};
    }
}

module.exports = new TeacherController()