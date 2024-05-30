'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HomeroomTeachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Classes',
            schema: 'public'
          },
          key: 'id'
        }
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teachers',
            schema: 'public'
          },
          key: 'id'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'CodeMasters',
            schema: 'public'
          },
          key: 'id'
        }
      },
      homeroom_teacher_type: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'CodeMasters',
            schema: 'public'
          },
          key: 'id'
        }
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      is_active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('HomeroomTeachers');
  }
};