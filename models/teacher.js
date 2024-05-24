'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teacher.init({
    fullname: DataTypes.STRING,
    start_date: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN,
    end_date: DataTypes.DATE,
    province: DataTypes.STRING,
    regency: DataTypes.STRING,
    sub_regency: DataTypes.STRING,
    address: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    phone_number_1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phone_number_2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    entity_id: DataTypes.INTEGER,
    detail_entity_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teacher',
    paranoid: true
  });
  return Teacher;
};