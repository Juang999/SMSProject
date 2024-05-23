require('dotenv').config()

const {SuperadminMiddleware} = require('../../../app/Kernel');
const {Auth} = require('../../../helper/helper.js');
const {ACCESS_TOKEN_SECRET} = process.env;
const jwt = require('jsonwebtoken');

describe('test SuperadminMiddleware', () => {
    let token;
    beforeEach( async () => {
        let {status, data} = await Auth.attempt({username: 'headmaster', password: '12345'})
    
        token = jwt.sign(data, ACCESS_TOKEN_SECRET)
    });

    test ('testing middleware while passed', async () => {
        let result = await SuperadminMiddleware({headers: {authorization: `Bearer ${token}`}})
        console.info(result)

        expect(result).toBe('passed')
    })

    test.only ('testing middleware while forbidden', async () => {
        let result = await SuperadminMiddleware({headers: {authorization: `Bearer ${token}`}})
        console.info(result)

        expect(result).toBe('forbidden')
    })
})