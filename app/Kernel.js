class Kernel {
    constructor () {
        return {
            Authorization: require('./Middleware/Authorization'),
            TeacherMiddleware: require('./Middleware/TeacherMiddleware'),
            StudentMiddleware: require('./Middleware/StudentMiddleware'),
            SuperadminMiddleware: require('./Middleware/SuperadminMiddleware'),
            HeadmasterMiddleware: require('./Middleware/HeadmasterMiddleware'),
        }
    }
}

module.exports = new Kernel()