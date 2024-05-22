const AuthController = require('./User/AuthController');
const TeacherController = require('./User/TeacherController');
const StudentController = require('./User/StudentController');
const MasterController = require('./Master/MasterController');

class Controller {
    constructor () {
        return {
            AuthController: AuthController,
            TeacherController: TeacherController,
            StudentController: StudentController,
            MasterController: MasterController,
        };
    }
}

module.exports = new Controller()