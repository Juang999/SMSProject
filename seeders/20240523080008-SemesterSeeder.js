'use strict';
const moment = require('moment')

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

    return queryInterface.bulkInsert('CodeMasters', [
      {
        code_code: 'SEMESTER1',
        code_field: 'semester',
        code_name: 'semester 1',
        code_description: 'semester ganjil',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        code_code: 'SEMESTER2',
        code_field: 'semester',
        code_name: 'semester 2',
        code_description: 'semester genap',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    ])
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
