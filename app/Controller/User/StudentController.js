const {
    Student
} = require('../../../models')
const fs = require('fs')

class StudentController {
    index = (req, res) => {
        Student.findAll({
            attributes: [
                'id',
                'name',
                'nis',
                'is_active',
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

    show = async (req, res) => {
        try {
            let {data, status} = await this.checkExistanceData(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: null
                    })
                
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

    store = (req, res) => {
        let photoPath = (this.uploadPhoto(req.files)) ? this.uploadPhoto(req.files) : null;

        Student.create({
            name: req.body.name,
            nis: this.formNisStudent(req.body.name),
            is_active: true,
            date_of_birth: req.body.date_of_birth,
            place_of_birth: req.body.place_of_birth,
            province: (req.body.province) ? req.body.province : null,
            city_regency: (req.body.city_regency) ? req.body.city_regency : null,
            sub_regency: (req.body.sub_regency) ? req.body.sub_regency : null,
            address: (req.body.address) ? req.body.address : null,
            photo: photoPath
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
            let {data, status} = await this.checkExistanceData(req.params.id);
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: null
                    })

                return;
            }
    
            let requests = this.requestUpdateStudent(req.body, data);
    
            let result = await Student.update({
                name: requests.name,
                is_active: requests.is_active,
                date_of_birth: requests.date_of_birth,
                place_of_birth: requests.place_of_birth,
                province: requests.province,
                city_regency: requests.city_regency,
                sub_regency: requests.sub_regency,
                address: requests.address,
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
                        status: 'not found',
                        data: null,
                        error: null
                    })

                return;
            }
    
            let result = await Student.destroy({where: {id: req.params.id}})
    
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

    activateStudent = async (req, res) => {
        try {
            let {data, status} = await this.checkExistanceData(req.params.id)
    
            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: null
                    })
    
                return;
            }
    
            let result = await Student.update({
                is_active: (data.is_active == true) ? false : true
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

    changePhotoStudent = async (req, res) => {
        try {
            let {status, data} = await this.checkExistanceData(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found',
                        data: null,
                        error: null
                    })

                return;
            }

            if (data.photo != null) this.removeImage(data.photo)

            let photoPath = (this.uploadPhoto(req.files)) ? this.uploadPhoto(req.files) : null;

            let result = await Student.update({
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
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    removePhotoStudent = async (req, res) => {
        try {
            let {data, status} = await this.checkExistanceData(req.params.id)

            if (status == false) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        data: null,
                        error: null
                    })

                return;
            }

            if (data.photo != null) this.removeImage(data.photo)

            let result = await Student.update({
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
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
    }

    requestUpdateStudent = (request, dataStudent) => {
        let requests = {
            name: (request.name) ? request.name : dataStudent.name,
            is_active: (request.is_active) ? request.is_active : dataStudent.is_active,
            date_of_birth: (request.date_of_birth) ? request.date_of_birth : dataStudent.date_of_birth,
            place_of_birth: (request.place_of_birth) ? request.place_of_birth : dataStudent.place_of_birth,
            province: (request.province) ? request.province : dataStudent.province,
            city_regency: (request.city_regency) ? request.city_regency : dataStudent.city_regency,
            sub_regency: (request.sub_regency) ? request.sub_regency : dataStudent.sub_regency,
            address: (request.address) ? request.address : dataStudent.address,
        }

        return requests;
    }

    formNisStudent = (request) => {
        return '-'
    }

    checkExistanceData = async (id) => {
        let dataStudent = await Student.findByPk(id)

        return {
            status: (dataStudent) ? true : false,
            data: (dataStudent) ? dataStudent.dataValues : []
        }
    }

    uploadPhoto = (files) => {
        let path;

        if (files) {
            console.info(files.photo)
            let file = files.photo
            let filename = file.name
            path = `/images/user/student/${filename}`

            file.mv(`./public/images/user/student/${filename}`)
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

module.exports = new StudentController()