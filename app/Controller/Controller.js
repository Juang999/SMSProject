class Controller {
    constructor () {
        return {
            AuthController: require('./User/AuthController'),
            ClassController: require('./School/ClassController'),
            LessonController: require('./School/LessonController'),
            MasterController: require('./Master/MasterController'),
            EntityController: require('./School/EntityController'),
            TeacherController: require('./User/TeacherController'),
            StudentController: require('./User/StudentController'),
            PeriodeController: require('./School/PeriodeController'),
        };
    }
}

module.exports = new Controller()