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

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Teachers', 'phone_number_1', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Teachers', 'phone_number_2', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        }, {
          transaction: t
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

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Teachers', 'phone_number_1', {transaction: t}),
        queryInterface.removeColumn('Teachers', 'phone_number_2', {transaction: t}),
      ])
    })
  }
};
