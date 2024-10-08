'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('teachers', 'phone_number_1', {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: true
        }),
        queryInterface.changeColumn('teachers', 'phone_number_2', {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: true
        })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
