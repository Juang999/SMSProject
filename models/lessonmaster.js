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
    }
  }
  LessonMaster.init({
    nama_pelajaran: DataTypes.STRING,
    tipe_pelajaran: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LessonMaster',
  });
  return LessonMaster;
};