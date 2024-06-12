'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const {
  get
} = require('express-http-context');
const Logging = require('../helper/Logging.js');

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
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'LessonTeachers', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'LessonTeachers', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'LessonTeachers', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return LessonTeacher;
};