const {
    Student
} = require('../../../models')

class StudentController {
    inputDataStudent = async (req, res) => {
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
            photo: '-'
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

    formNisStudent = (request) => {
        console.info(request)
        return '-'
    }
}

module.exports = new StudentController()