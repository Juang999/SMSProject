'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailLesson.belongsTo(models.Entity, {
        as: 'entity',
        targetKey: 'id',
        foreignKey: 'entity_id'
      })

      DetailLesson.belongsTo(models.DetailEntity, {
        as: 'detail_entity',
        targetKey: 'id',
        foreignKey: 'detail_entity_id'
      })

      DetailLesson.belongsTo(models.LessonMaster, {
        as: 'lesson',
        targetKey: 'id',
        foreignKey: 'lesson_id'
      })

      DetailLesson.belongsTo(models.Class, {
        as: 'class',
        targetKey: 'id',
        foreignKey: 'class_id'
      })

      DetailLesson.belongsTo(models.Periode, {
        as: 'periode',
        targetKey: 'id',
        foreignKey: 'entity_id'
      })

      DetailLesson.belongsTo(models.DetailPeriode, {
        as: 'detail_periode',
        targetKey: 'id',
        foreignKey: 'detail_periode_id'
      })
    }
  }
  DetailLesson.init({
    entity_id: DataTypes.INTEGER,
    detail_entity_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    periode_id: DataTypes.INTEGER,
    detail_periode_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DetailLesson',
  });
  return DetailLesson;
};