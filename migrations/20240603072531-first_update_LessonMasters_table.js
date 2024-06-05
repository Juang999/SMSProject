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
        queryInterface.addColumn('LessonMasters', 'description', {
          type: Sequelize.DataTypes.TEXT
        }, {
          transaction: t
        }),
        queryInterface.addColumn('LessonMasters', 'is_active', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: true
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
        queryInterface.removeColumn('LessonMasters', 'description', {transaction: t}),
        queryInterface.removeColumn('LessonMasters', 'is_active', {transaction: t}),
      ])
    });
  }
};
