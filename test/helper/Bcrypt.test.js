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