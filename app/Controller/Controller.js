const AuthController = require('./Auth/AuthController')

class Controller {
    constructor () {
        return {
            AuthController: AuthController
        }
    }
}

module.exports = new Controller()