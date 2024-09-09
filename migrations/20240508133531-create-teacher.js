'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      regency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sub_regency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teachers');
  }
};