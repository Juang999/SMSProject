const Auth = require('./Auth.js');
const Bcrypt = require('./Bcrypt.js');
const Logging = require('./Logging.js');

class Helper {
    constructor () {
        return {
            Auth,
            Bcrypt,
            Logging,
        }
    }
}

module.exports = new Helper()