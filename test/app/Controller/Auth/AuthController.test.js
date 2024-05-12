const {AuthController} = require('../../../../app/Controller/Controller.js')
const {Bcrypt} = require('../../../../helper/helper.js')

test ('test registering user', async () => {
    let registerUser = await AuthController.register({
        username: 'Juang',
        password: Bcrypt.hashPassword('Arthemist666')
    })
    console.info(registerUser)

    expect(registerUser).toBeDefined()
})

test ('test to get data user', async () => {
    let getUser = await AuthController.getUsers()
    console.info(getUser)

    expect(getUser).toBeDefined()
})

test ('test login user', async () => {
    let result = await AuthController.login({
        username: 'super-admin',
        password: '12345'
    })
    console.info(result)

    expect(result).toBeDefined()
})