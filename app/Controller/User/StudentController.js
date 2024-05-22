const {
    Student
} = require('../../../models')

class StudentController {
    getDataStudent = async () => {
        let dataStudent = await Student.findAll({
            attributes: [
                'id',
                'name',
                'nis',
                'is_active',
            ]
        });

        return dataStudent;
    }

    showDetailDataStudent = async (id) => {
        let {data, status} = await this.checkExistanceData(id)

        if (status == false) {
            return false;
        }

        return data;
    }

    inputDataStudent = (req, res) => {
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

    updateDataStudent = async (request, id) => {
        let {data, status} = await this.checkExistanceData(id);

        if (status == false) {
            return false;
        }

        let requests = this.requestUpdateStudent(request, data);

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
                id: id
            }
        })

        return result;
    }

    requestUpdateStudent = (request, dataStudent) => {
        let requests = {
            name: (request.body.name) ? request.body.name : dataStudent.name,
            is_active: (request.body.is_active) ? request.body.is_active : dataStudent.is_active,
            date_of_birth: (request.body.date_of_birth) ? request.body.date_of_birth : dataStudent.date_of_birth,
            place_of_birth: (request.body.place_of_birth) ? request.body.place_of_birth : dataStudent.place_of_birth,
            province: (request.body.province) ? request.body.province : dataStudent.province,
            city_regency: (request.body.city_regency) ? request.body.city_regency : dataStudent.city_regency,
            sub_regency: (request.body.sub_regency) ? request.body.sub_regency : dataStudent.sub_regency,
            address: (request.body.address) ? request.body.address : dataStudent.address,
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
}

module.exports = new StudentController()