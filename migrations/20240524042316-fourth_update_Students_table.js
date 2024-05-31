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
        queryInterface.addColumn('Students', 'entity_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Entities',
              schema: 'public',
            },
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Students', 'detail_entity_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'DetailEntities',
              schema: 'public'
            },
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, {
          transaction: t
        })
      ]);
    });
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
        queryInterface.removeColumn('Students', 'entity_id', {transaction: t}),
        queryInterface.removeColumn('Students', 'detail_entity_id', {transaction: t}),
      ])
    })
  }
};
