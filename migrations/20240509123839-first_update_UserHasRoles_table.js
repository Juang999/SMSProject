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
        queryInterface.removeColumn('UserHasRoles', 'user_id', {transaction: t}),
        queryInterface.removeColumn('UserHasRoles', 'role_id', {transaction: t}),
        queryInterface.addColumn('UserHasRoles', 'user_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Users'
            },
            key: 'id'
          }
        }, {
          transaction: t
        }),
        queryInterface.addColumn('UserHasRoles', 'role_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Roles'
            },
            key: 'id'
          }
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
        queryInterface.removeColumn('UserHasRoles', 'user_id', {transaction: t}),
        queryInterface.removeColumn('UserHasRoles', 'role_id', {transaction: t}),
      ])
    })
  }
};
