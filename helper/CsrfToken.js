let Tokens = require('csrf');
let secret = 'f67c09cc628d0b82a819bf0ecdfc7809';

class CsrfToken {
    generateToken = () => {
        let token = Tokens.create(secret);

        return token;
    }

    verifyToken = (token) => {
        if (!Tokens.verify(secret, token)) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = new CsrfToken();