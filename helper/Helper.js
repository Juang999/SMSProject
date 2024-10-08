class Helper {
    constructor () {
        return {
            Auth: require('./Auth.js'),
            Bcrypt: require('./Bcrypt.js'),
            Logging: require('./Logging.js'),
        }
    }
}

module.exports = new Helper()