'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Examinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Periodes',
            schema: 'public'
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
            schema: 'public'
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      entity_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Entities',
            schema: 'public'
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
            schema: 'public'
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('Examinations');
  }
};