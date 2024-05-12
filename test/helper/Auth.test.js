const {Auth} = require('../../helper/helper.js')

test ('compare password', async () => {
    let comparationPassword = await Auth.checkPassword('Juang', '$2b$10$mtVzhj2iktO3Cl0bk.CureoFXoynrKIy8WWbLYzx51nqFKNBq97Rq')
    console.info(comparationPassword)

    expect(() => comparationPassword).toThrow('ups anda menggunaakan fitur ini!')
})

test ('test attempt', async () => {
    let result = await Auth.attempt({
        username: 'super-admin',
        password: '12345'
    })

    console.info(result)

    expect(result.status).toBeTruthy()
})