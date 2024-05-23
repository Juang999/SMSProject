const Authorization = require('./Middleware/Authorization');
const TeacherMiddleware = require('./Middleware/TeacherMiddleware');
const StudentMiddleware = require('./Middleware/StudentMiddleware');
const SuperadminMiddleware = require('./Middleware/SuperadminMiddleware');
const HeadmasterMiddleware = require('./Middleware/HeadmasterMiddleware');

class Kernel {
    constructor () {
        return {
            Authorization: Authorization,
            TeacherMiddleware: TeacherMiddleware,
            StudentMiddleware: StudentMiddleware,
            SuperadminMiddleware: SuperadminMiddleware,
            HeadmasterMiddleware: HeadmasterMiddleware,
        }
    }
}

module.exports = new Kernel()