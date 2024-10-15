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
    return queryInterface.bulkInsert('lessonmasters', [
      {
        nama_pelajaran: 'Nahwu Wadih 1',
        tipe_pelajaran: 19,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        description: 'Pelajaran Gramatikal Bahasa Arab',
        is_active: true,
      }, {
        nama_pelajaran: 'Nahwu Wadih 2',
        tipe_pelajaran: 19,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        description: 'Pelajaran Gramatikal Bahasa Arab',
        is_active: true,
      }, {
        nama_pelajaran: 'Nahwu Wadih 3',
        tipe_pelajaran: 19,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        description: 'Pelajaran Gramatikal Bahasa Arab',
        is_active: true,
      }, {
        nama_pelajaran: 'Durusun Al-Lughoh 1',
        tipe_pelajaran: 19,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        description: 'Pelajaran Bahasa Arab',
        is_active: true,
      }, {
        nama_pelajaran: 'Durusun Al-Lughoh 2',
        tipe_pelajaran: 19,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        description: 'Pelajaran Bahasa Arab',
        is_active: true,
      },
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
