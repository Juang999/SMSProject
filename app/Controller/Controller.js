const AuthController = require('./User/AuthController');
const ClassController = require('./School/ClassController');
const TeacherController = require('./User/TeacherController');
const StudentController = require('./User/StudentController');
const MasterController = require('./Master/MasterController');
const EntityController = require('./School/EntityController');
const PeriodeController = require('./School/PeriodeController');

class Controller {
    constructor () {
        return {
            AuthController: AuthController,
            ClassController: ClassController,
            MasterController: MasterController,
            EntityController: EntityController,
            TeacherController: TeacherController,
            StudentController: StudentController,
            PeriodeController: PeriodeController,
        };
    }
}

module.exports = new Controller()