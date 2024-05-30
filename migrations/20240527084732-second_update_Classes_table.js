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
        queryInterface.addColumn('Classes', 'entity_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Entities',
              schema: 'public'
            },
            key: 'id'
          }
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Classes', 'detail_entity_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'DetailEntities',
              schema: 'public'
            },
            key: 'id'
          }
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Classes', 'periode_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Periodes',
              schema: 'public'
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
        queryInterface.removeColumn('Classes', 'entity_id', {transaction: t}),
        queryInterface.removeColumn('Classes', 'semester_id', {transaction: t}),
        queryInterface.removeColumn('Classes', 'periode_id', {transaction: t}),
        queryInterface.removeColumn('Classes', 'detail_periode_id', {transaction: t}),
      ]);
    });
  }
};
