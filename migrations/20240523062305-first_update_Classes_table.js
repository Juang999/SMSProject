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
        queryInterface.removeColumn('Classes', 'class', {transaction: t}),
        queryInterface.addColumn('Classes', 'class_code_master_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'CodeMasters',
              schema: 'public',
            },
            key: 'id'
          }
        }, {
          transaction: t
        })
      ]);
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
