const {
    Teacher
} = require('../../../models')
const {Op} = require('sequelize')

class TeacherController {
    index = (req, res) => {
        let searchName = (req.query.searchname) ? req.query.searchname : ''

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

    createDataTeacher = (req, res) => {
        Teacher.create({
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

    show = async (req, res) => {
        try {
            let {data, status} = await this.checkDataTeacher(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found',
                        data: null,
                        error: null
                    });

                return;
            }
            
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
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

    update = async (req, res) => {
        try {
            let {data: dataTeacher, status} = await this.checkDataTeacher(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found',
                        data: null,
                        error: null
                    })
            }

            let resultUpdateTeacher = await this.updateDataTeacher(req.body, dataTeacher, req.params.id)

            res.status(200)
                .json({
                    status: 'success',
                    data: resultUpdateTeacher,
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

    updateDataTeacher = async (request, dataTeacher, id) => {
        let requests = await this.requestUpdateData(request, dataTeacher, id);

        let RESULT_UPDATE_DATE = await Teacher.update({
            fullname: requests['fullname'],
            start_date: requests['start_date'],
            is_active: requests['is_active'],
            end_date: requests['end_date'],
            province: requests['province'],
            regency: requests['regency'],
            sub_regency: requests['sub_regency'],
            address: requests['address'],
            email: requests['email'],
            phone_number_1: requests['phone_number_1'],
            phone_number_2: requests['phone_number_2'],
            photo: requests['photo'],
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
            fullname: (request.fullname) ? request.fullname : dataTeacher.fullname,
            start_date: (request.start_date) ? request.start_date : dataTeacher.start_date,
            is_active: (request.is_active) ? request.is_active : dataTeacher.is_active,
            end_date: (request.end_date) ? request.end_date : dataTeacher.end_date,
            province: (request.province) ? request.province : dataTeacher.province,
            regency: (request.regency) ? request.regency : dataTeacher.regency,
            sub_regency: (request.sub_regency) ? request.sub_regency : dataTeacher.sub_regency,
            address: (request.address) ? request.address : dataTeacher.address,
            email: (request.email) ? request.email : dataTeacher.email,
            phone_number_1: (request.phone_number_1) ? request.phone_number_1 : dataTeacher.phone_number_1,
            phone_number_2: (request.phone_number_2) ? request.phone_number_2 : dataTeacher.phone_number_2,
            photo: (request.photo) ? request.photo : dataTeacher.photo,
        }

        console.info(requests['end_date'])

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