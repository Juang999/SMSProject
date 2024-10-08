class Kernel {
    constructor () {
        return {
            Middleware: {
                Authorization: require('./Middleware/Authorization'),
                TeacherMiddleware: require('./Middleware/TeacherMiddleware'),
                StudentMiddleware: require('./Middleware/StudentMiddleware'),
                SuperadminMiddleware: require('./Middleware/SuperadminMiddleware'),
                HeadmasterMiddleware: require('./Middleware/HeadmasterMiddleware'),
            },
            Requests: {
                MasterCreateRequest: require('./Requests/MasterRequests/MasterCreateRequest'),
                MasterUpdateRequest: require('./Requests/MasterRequests/MasterUpdateRequest'),
                MasterDeleteRequest: require('./Requests/MasterRequests/MasterDeleteRequest')
            }
        }
    }
}

module.exports = new Kernel()