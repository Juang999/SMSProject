const {Bcrypt} = require('../../helper/helper.js')

test ('generate salt bcrypt', async () => {
    let saltBcrypt = await Bcrypt.generateSalt()
    console.info(saltBcrypt)

    expect(saltBcrypt).toBeDefined()
})


test ('get hashed password', async () => {
    let hashedPassword = await Bcrypt.hashPassword('Juang')
    console.info(hashedPassword)

    expect(hashedPassword).toBeDefined()
})


describe ('test encrypt & decrypt id', () => {
    let encryptedData;
    
    test ('get encrypted id', () => {
        encryptedData = Bcrypt.AESEncrypt(1)
        console.info(encryptedData)
    
        expect(encryptedData).toBeDefined();
    })

    test ('get decrypted id', () => {
        let decryptedData = Bcrypt.AESDecrypt(encryptedData);
        console.info(decryptedData)

        expect(decryptedData).toBe(`1`)
    })
})