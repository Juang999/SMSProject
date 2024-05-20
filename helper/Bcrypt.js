require('dotenv').config()

const {genSaltSync, hashSync, compare} = require('bcrypt');
const {SECRET_KEY} = process.env;
const Cryptojs = require('crypto-js');

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

    AESEncrypt = (data) => {
        let encryptedData = Cryptojs.AES.encrypt(`${data}`, SECRET_KEY).toString();

        return encryptedData;
    }

    AESDecrypt = (data) => {
        let decryptedData = Cryptojs.AES.decrypt(data, SECRET_KEY);
        let originalText = decryptedData.toString(Cryptojs.enc.Utf8);

        return originalText;
    }
}

module.exports = new Bcrypt()