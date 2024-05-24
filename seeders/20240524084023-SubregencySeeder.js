'use strict';

const axios = require('axios');
const moment = require('moment');
const {
  CityRegency
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

    let dataCityRegency = await CityRegency.findAll({
      attributes: [
        'city_regency_id'
      ]
    })

    let array = [];

    for (const {dataValues} of dataCityRegency) {
      let {data} = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${dataValues.city_regency_id}.json`);

      let result = data.map(data => {
        return {
          city_regency_id: data.regency_id,
          subregency_id: data.id,
          name: data.name,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
      })

      array.push(...result);
    }

    return queryInterface.bulkInsert('SubRegencies', array)
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
