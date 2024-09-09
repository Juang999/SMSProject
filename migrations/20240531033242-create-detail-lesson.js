'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailLessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entity_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Entities',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      detail_entity_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'DetailEntities',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      lesson_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'LessonMasters',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Classes',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      periode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Periodes',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      detail_periode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'DetailPeriodes',
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('DetailLessons');
  }
};