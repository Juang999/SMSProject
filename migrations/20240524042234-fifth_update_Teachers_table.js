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
        queryInterface.addColumn('Teachers', 'entity_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Entities',
            },
            key: 'id'
          }
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Teachers', 'detail_entity_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'DetailEntities',
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
