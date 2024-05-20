require('dotenv').config()

const {Authorization} = require('../../../app/Kernel');
const {Auth} = require('../../../helper/helper.js');
const {ACCESS_TOKEN_SECRET} = process.env;
const jwt = require('jsonwebtoken');

describe ('test authorization middleware', () => {
    let token;
    beforeEach( async () => {
        let {status, data} = await Auth.attempt({username: 'super-admin', password: '12345'})
    
        token = jwt.sign(data, ACCESS_TOKEN_SECRET)
    });
    
    test('test authorization', async () => {
        let dataUser = await Authorization({headers: {authorization: `Bearer ${token}`}});
    
        expect(dataUser).toBeTruthy();
})
})