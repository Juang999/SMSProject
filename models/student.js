'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    nis: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    date_of_birth: DataTypes.DATE,
    place_of_birth: DataTypes.STRING,
    province: DataTypes.STRING,
    city_regency: DataTypes.STRING,
    sub_regency: DataTypes.STRING,
    address: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};