'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentClass.belongsTo(models.Student, {
        as: 'student',
        targetKey: 'id',
        foreignKey: 'student_id'
      })
    }
  }
  StudentClass.init({
    class_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};