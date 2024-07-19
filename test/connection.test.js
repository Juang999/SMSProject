const {sequelize, Teacher} = require('../models')
const {Sequelize} = require('sequelize')

test ('test connection into database', async () => {
    let connection = new Sequelize('sms_development', 'root', 'Toor123@#', {
        host: 'localhost',
        dialect: 'mysql'
    })

    try {
        await connection.authenticate()
        var message = 'database connected!'
        await connection.close()
    } catch (error) {
        var message = 'disconnected!'
    }

    expect(message).toBe('database connected!')
})

test.only('test environment', async () => {
    let data = await Teacher.findAll();

    console.info(data);
});