'use strict';

const moment = require('moment');

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
        code_code: 'LESSON-TYPE1',
        code_field: 'lesson-type',
        code_name: 'Wajib',
        code_description: 'matapelajaran wajib diikuti',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        code_code: 'LESSON-TYPE2',
        code_field: 'lesson-type',
        code_name: 'Ekstrakulikuler',
        code_description: 'matapelajaran tidak wajib diikuti',
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

    return queryInterface.bulkDelete('CodeMasters', {code_field: 'lesson-type'}, {})
  }
};
