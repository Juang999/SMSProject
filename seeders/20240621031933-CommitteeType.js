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

    return await queryInterface.bulkInsert('CodeMasters', [
      {
        code_code: 'EXAM-COMMITTEE-TYPE1',
        code_field: 'exam-committee-type',
        code_name: 'Ketua',
        code_description: 'Ketua Panitia Ujian',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        code_code: 'EXAM-COMMITTEE-TYPE2',
        code_field: 'exam-committee-type',
        code_name: 'Sekretaris',
        code_description: 'Sekretaris Panitia Ujian',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, {
        code_code: 'EXAM-COMMITTEE-TYPE3',
        code_field: 'exam-committee-type',
        code_name: "Ri'ayah",
        code_description: 'Pengasuh sementara saat hari ujian',
        code_is_active: true,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('CodeMasters', {code_field: 'exam-committee-type'}, {});
  }
};
