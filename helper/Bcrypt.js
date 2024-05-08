const {genSalt, hash, compare} = require('bcrypt')

class Bcrypt {
    saltRound

    constructor () {
        this.saltRound = 10
    }

    generateSalt = async () => {
        return await genSalt(this.saltRound)
    }

    hashPassword = async (realPassword) => {
        let saltBcrypt = await this.generateSalt()

        return await hash(realPassword, saltBcrypt)
    }
}

module.exports = new Bcrypt()