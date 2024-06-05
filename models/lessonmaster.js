'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LessonMaster.hasMany(models.DetailLesson, {
        as: 'detail_lesson',
        sourceKey: 'id',
        foreignKey: 'lesson_id'
      })
    }
  }
  LessonMaster.init({
    nama_pelajaran: DataTypes.STRING,
    tipe_pelajaran: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    schema: 'public',
    modelName: 'LessonMaster',
  });
  return LessonMaster;
};