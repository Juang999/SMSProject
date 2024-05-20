const AuthController = require('./User/AuthController');
const TeacherController = require('./User/TeacherController');
const StudentController = require('./User/StudentController');

class Controller {
    constructor () {
        return {
            AuthController: AuthController,
            TeacherController: TeacherController,
            StudentController: StudentController
        };
    }
}

module.exports = new Controller()