'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailEntity.belongsTo(models.Entity, {
        as: 'entity',
        targetKey: 'id',
        foreignKey: 'entity_id'
      })

      DetailEntity.belongsTo(models.CodeMaster, {
        as: 'location',
        targetKey: 'id',
        foreignKey: 'location_id'
      })
    }
  }
  DetailEntity.init({
    entity_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DetailEntity',
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'DetailEntities', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'DetailEntities', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'DetailEntities', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return DetailEntity;
};