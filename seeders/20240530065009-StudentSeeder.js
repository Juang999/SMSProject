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

    return queryInterface.bulkInsert('Students', [
      {
        name: 'Andreas',
        nis: '-',
        is_active: true,
        place_of_birth: 'Bandung',
        province: 'Jawa Barat',
        city_regency: 'Bandung',
        sub_regency: 'Bandung',
        address: 'Jalan Raya Bandung',
        photo: null,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        date_of_birth: '2010-07-01',
        entity_id: 1,
        detail_entity_id: 5,
      }, {
        name: 'Bakti',
        nis: '-',
        is_active: true,
        place_of_birth: 'Bojong Soang',
        province: 'Jawa Barat',
        city_regency: 'Kabupaten Bogor',
        sub_regency: 'Jonggol',
        address: 'Jonggol Ujung Bogor',
        photo: null,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        date_of_birth: '2010-07-02',
        entity_id: 1,
        detail_entity_id: 5,
      }, {
        name: 'Farhat Abbas',
        nis: '-',
        is_active: true,
        place_of_birth: 'Bojong Soang',
        province: 'Jawa Barat',
        city_regency: 'Bogor',
        sub_regency: 'Bogor',
        address: 'Kota Bogor',
        photo: null,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        date_of_birth: '2010-07-02',
        entity_id: 1,
        detail_entity_id: 5,
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
