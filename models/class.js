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
      Class.belongsTo(models.CodeMaster, {
        as: 'class_type',
        targetKey: 'id',
        foreignKey: 'type'
      })

      Class.belongsTo(models.Entity, {
        as: 'entity',
        targetKey: 'id',
        foreignKey: 'entity_id'
      })

      Class.belongsTo(models.DetailEntity, {
        as: 'detail_entity',
        targetKey: 'id',
        foreignKey: 'detail_entity_id'
      })

      Class.belongsTo(models.Periode, {
        as: 'periode',
        targetKey: 'id',
        foreignKey: 'periode_id'
      })

      Class.hasMany(models.HomeroomTeacher, {
        as: 'homeroom_teacher',
        sourceKey: 'id',
        foreignKey: 'class_id'
      })

      Class.hasMany(models.StudentClass, {
        as: 'student_class',
        sourceKey: 'id',
        foreignKey: 'class_id'
      })
    }
  }
  Class.init({
    class_code_master_id: DataTypes.INTEGER,
    class_code: DataTypes.STRING,
    type: DataTypes.INTEGER,
    grade: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    entity_id: DataTypes.INTEGER,
    detail_entity_id: DataTypes.INTEGER,
    periode_id: DataTypes.INTEGER
  }, {
    sequelize,
    schema: 'public',
    modelName: 'Class',
    paranoid: true,
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'Classes', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'Classes', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'Classes', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return Class;
};