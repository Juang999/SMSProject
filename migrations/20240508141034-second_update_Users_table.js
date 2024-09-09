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
        queryInterface.changeColumn('Users', 'teacher_id', {
          type: Sequelize.DataTypes.INTEGER,
          unique: true,
          references: {
            model: {
              tableName: 'Teachers'
            },
            key: 'id',
          }
        }, {
          transaction: t
        }),
        queryInterface.changeColumn('Users', 'student_id', {
          type: Sequelize.DataTypes.INTEGER,
          unique: true,
          references: {
            model: {
              tableName: 'Students'
            },
            key: 'id',
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
        queryInterface.removeColumn('Users', 'student_id', {transaction: t}),
        queryInterface.removeColumn('Users', 'teacher_id', {transaction: t}),
      ])
    })
  }
};
