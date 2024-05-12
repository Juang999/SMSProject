const {genSaltSync, hashSync, compare} = require('bcrypt')

class Bcrypt {
    saltRound

    constructor () {
        this.saltRound = 10
    }

    generateSalt = () => {
        return genSaltSync(this.saltRound)
    }

    hashPassword = (realPassword) => {
        let saltBcrypt = this.generateSalt()

        return hashSync(realPassword, saltBcrypt)
    }
}

module.exports = new Bcrypt()