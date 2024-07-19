const path = require('path');

let {parsed: testEnvironment} = require('dotenv').config({path: path.resolve('./.env.test')});
let {parsed: devEnvironment} = require('dotenv').config({path: path.resolve('./.env.development')});
let {parsed: productionEnvironment} = require('dotenv').config({path: path.resolve('./.env.production')});

module.exports = {
    development: {
        username: devEnvironment.DB_USERNAME,
        password: devEnvironment.DB_PASSWORD,
        database: devEnvironment.DB_DATABASE,
        host: devEnvironment.DB_HOST,
        dialect: devEnvironment.DB_DIALECT
    },
    test: {
        username: testEnvironment.DB_USERNAME,
        password: testEnvironment.DB_PASSWORD,
        database: testEnvironment.DB_DATABASE,
        host: testEnvironment.DB_HOST,
        dialect: testEnvironment.DB_DIALECT
    },
    production: {
        username: productionEnvironment.DB_USERNAME,
        password: productionEnvironment.DB_PASSWORD,
        database: productionEnvironment.DB_DATABASE,
        host: productionEnvironment.DB_HOST,
        dialect: productionEnvironment.DB_DIALECT
    }
}