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

    return queryInterface.bulkInsert('Teachers', [
      {
        fullname: 'Bangkit Juang Raharjo',
        start_date: '2024-08-01',
        is_active: true,
        province: 'Jawa Barat',
        regency: 'Kabupaten Bogor',
        sub_regency: 'Babakan Madang',
        address: 'Sentul City',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: 'bangkitjuangraharjo@gmail.com',
        phone_number_1: '081325507780',
        entity_id: 1,
        detail_entity_id: 5,
      }, {
        fullname: 'Zulda Zakaria Badrudin',
        start_date: '2024-08-01',
        is_active: true,
        province: 'Jawa Barat',
        regency: 'Kabupaten Bandung Barat',
        sub_regency: 'Padalarang',
        address: 'Permatasari',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: 'zuldabadrudin@gmail.com',
        phone_number_1: '62812357123',
        entity_id: 1,
        detail_entity_id: 5,
      }, {
        fullname: 'Raditya Cahyadi Nugraha',
        start_date: '2024-08-01',
        is_active: true,
        province: 'Jawa Barat',
        regency: 'Kota Bandung',
        sub_regency: 'Bojong Loak Kidul',
        address: 'Kampung',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        email: 'radityacahyadit3@gmail.com',
        phone_number_1: '628796125512',
        entity_id: 1,
        detail_entity_id: 5,
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

    return queryInterface.bulkDelete('Teachers', {fullname: 'Bangkit Juang Raharjo'}, {});
  }
};
