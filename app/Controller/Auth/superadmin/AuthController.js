const {
    User, Teacher, 
    sequelize, Sequelize
} = require('../../../../models')

class AuthController {
    register = async (request) => {
        let t = await Sequelize.Transaction()
        try {
            
        } catch (error) {
            
        }
    }

    inputDataTeacher = async (request) => {
        let dataTeacher = await Teacher.create({
            fullname: request.fullname,
            start_date: request.start_date,
            is_active: false,
            end_date: request.end_date,
            province: (request.province) ? request.province : null,
            regency: (request.regency) ? request.regency : null,
            sub_regency: (request.sub_regency) ? request.sub_regency : null,
            address: (request.address) ? request.address : null,
            email: (request.email) ? request.email : null,
            phone_number_1: (request.phone_number_1) ? request.phone_number_1 : null,
            phone_number_2: request.phone_number_2 ? request.phone_number_2 : null,
        })

        return dataTeacher
    }
}

module.exports = new AuthController()