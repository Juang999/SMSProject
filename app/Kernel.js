const Authorization = require('./Middleware/Authorization')

class Kernel {
    constructor () {
        return {
            Authorization: Authorization
        }
    }
}

module.exports = new Kernel()