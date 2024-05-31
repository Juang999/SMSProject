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
        queryInterface.addColumn('Entities', 'province', {
          type: Sequelize.DataTypes.STRING
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Entities', 'city_regency', {
          type: Sequelize.DataTypes.STRING
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Entities', 'sub_regency', {
          type: Sequelize.DataTypes.STRING
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Entities', 'address', {
          type: Sequelize.DataTypes.TEXT
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
        queryInterface.removeColumn('Entities', 'province', {transaction: t}),
        queryInterface.removeColumn('Entities', 'city_regency', {transaction: t}),
        queryInterface.removeColumn('Entities', 'sub_regency', {transaction: t}),
        queryInterface.removeColumn('Entities', 'address', {transaction: t}),
      ])
    })
  }
};
