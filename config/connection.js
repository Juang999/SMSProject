require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
        host: process.env.DEV_DB_HOST,
        dialect: process.env.DEV_DB_DIALECT
    },
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        host: process.env.TEST_DB_HOST,
        dialect: process.env.TEST_DB_DIALECT
    },
    production: {
        username: process.env.PRODUCTION_DB_USERNAME,
        password: process.env.PRODUCTION_DB_PASSWORD,
        database: process.env.PRODUCTION_DB_DATABASE,
        host: process.env.PRODUCTION_DB_HOST,
        dialect: process.env.PRODUCTION_DB_DIALECT
    }
}