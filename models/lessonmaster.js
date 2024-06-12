'use strict';
const {
  Model
} = require('sequelize');
const Logging = require('../helper/Logging.js');

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
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'LessonMasters', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'LessonMasters', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'LessonMasters', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return LessonMaster;
};