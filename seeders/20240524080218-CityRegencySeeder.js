'use strict';

const axios = require('axios')
const moment = require('moment')
const {
  Province
} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let dataProvince = await Province.findAll({
      attributes: [
        'province_id'
      ]
    })

    let array = [];

    for (const {dataValues} of dataProvince) {
      let {data} = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${dataValues.province_id}.json`);

      let result = data.map(data => {
        return {
          city_regency_id: data.id,
          province_id: data.province_id,
          name: data.name,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
      })

      array.push(...result);
      
    }

    return queryInterface.bulkInsert('CityRegencies', array)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
