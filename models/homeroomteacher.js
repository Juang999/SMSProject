'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeroomTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HomeroomTeacher.belongsTo(models.Teacher, {
        as: 'teacher',
        targetKey: 'id',
        foreignKey: 'teacher_id'
      })

      HomeroomTeacher.belongsTo(models.CodeMaster, {
        as: 'status_teacher',
        targetKey: 'id',
        foreignKey: 'status'
      })

      HomeroomTeacher.belongsTo(models.CodeMaster, {
        as: 'homeroom_type',
        targetKey: 'id',
        foreignKey: 'homeroom_teacher_type'
      })
    }
  }
  HomeroomTeacher.init({
    class_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    homeroom_teacher_type: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HomeroomTeacher',
  });
  return HomeroomTeacher;
};