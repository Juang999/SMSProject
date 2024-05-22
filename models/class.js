'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Class.init({
    class: DataTypes.STRING,
    class_code: DataTypes.STRING,
    type: DataTypes.INTEGER,
    grade: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    schema: 'public',
    modelName: 'Class',
    paranoid: true,
  });
  return Class;
};