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
        queryInterface.addColumn('Classes', 'homeroom_teacher_1', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Teachers',
              schema: 'public'
            },
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, {
          transaction: t
        }),
        queryInterface.addColumn('Classes', 'homeroom_teacher_2', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Teachers',
              schema: 'public'
            },
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
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
        queryInterface.removeColumn('Classes', 'homeroom_teacher_1', {transaction: t}),
        queryInterface.removeColumn('Classes', 'homeroom_teacher_2', {transaction: t}),
      ]);
    });
  }
};
