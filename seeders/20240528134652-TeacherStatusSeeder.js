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
        code_code: 'STATUS1',
        code_field: 'status',
        code_name: 'ada',
        code_description: 'status member',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        code_code: 'STATUS2',
        code_field: 'status',
        code_name: 'berhenti',
        code_description: 'status member',
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

    return queryInterface.bulkDelete('CodeMasters', {code_field: 'teacher-status'}, {})
  }
};
