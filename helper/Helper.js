const Auth = require('./Auth.js')
const Bcrypt = require('./Bcrypt.js')

class Helper {
    constructor () {
        return {
            Auth,
            Bcrypt
        }
    }
}

module.exports = new Helper()