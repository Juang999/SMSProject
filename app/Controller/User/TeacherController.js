const {
    Teacher
} = require('../../../models/index.js');
const {Op} = require('sequelize');
const fs = require('fs');
const {
    Logging
} = require('../../../helper/helper.js');

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
        .catch(({message, stack}) => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        })
    }

    store = (req, res) => {
        let photoPath = (this.uploadFile(req.files)) ? this.uploadFile(req.files) : null;

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
            photo: photoPath,
            entity_id: req.body.entity_id,
            detail_entity_id: req.body.detail_entity_id
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(({message, stack}) => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
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
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
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
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    delete = async (req, res) => {
        try {
            let {status} = await this.checkDataTeacher(req.params.id)
    
            if (status == false) {
                return false;
            }
    
            let dataTeacher = await Teacher.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: dataTeacher,
                    error: null
                })
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    activateTeacher = async (req, res) => {
        try {
            let {data, status} = await this.checkDataTeacher(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            let result = await Teacher.update({
                is_active: (data.is_active == true) ? false: true
            }, {
                where: {
                    id: req.params.id
                }
            });

            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                });
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                });

            Logging.error({message, stack});
        }
    }

    changePhotoTeacher = async (req, res) => {
        try {
            let {data, status} = await this.checkDataTeacher(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            if (data.photo != null) this.removeImage(data.photo)

            let photoPath = (this.uploadFile(req.files)) ? this.uploadFile(req.files) : null;

            let result = Teacher.update({
                photo: photoPath
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
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
        }
    }

    removePhotoTeacher = async (req, res) => {
        try {
            let {data, status} = await this.checkDataTeacher(req.params.id);

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: 'not found!'
                    })

                return;
            }

            if (data.photo != null) this.removeImage(data.photo)

            let result = Teacher.update({
                photo: null
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
        } catch ({message, stack}) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: message
                })

            Logging.error({message, stack});
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
            entity_id: requests['entity_id'],
            detail_entity_id: requests['detail_entity_id']
        }, {
            where: {
                id: id
            }
        })

        return RESULT_UPDATE_DATE;
    }

    /**
     * create requests
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
            entity_id: (request.entity_id) ? request.entity_id : dataTeacher.entity_id,
            detail_entity_id: (request.detail_entity_id) ? request.detail_entity_id : dataTeacher.detail_entity_id
        }

        return requests;
    }

    /**
     * bellow function is to find the data
     * when the data doesn't exist it will
     * return 404 not found and it will
     * return the data & status while
     * exist
     */
    checkDataTeacher = async (id) => {
        let dataTeacher = await Teacher.findByPk(id);

        return (dataTeacher) ? {data: dataTeacher.dataValues, status: true} : {data: null, status: false};
    }

    uploadFile = (files) => {
        let path;

        if (files) {
            let file = files.photo
            let filename = file.name
            path = `/images/user/teacher/${filename}`

            file.mv(`./public/images/user/teacher/${filename}`)
        }

        return path;
    }

    removeImage = (filepath) => {
        fs.unlink(`./public${filepath}`, (err) => {
            if (err) {
                console.info(err.message)
            }
        })
    }
}

module.exports = new TeacherController()