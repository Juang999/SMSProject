'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LessonTeacher.init({
    detail_lesson_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY
  }, {
    sequelize,
    schema: 'public',
    modelName: 'LessonTeacher',
  });
  return LessonTeacher;
};