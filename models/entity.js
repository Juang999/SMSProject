'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Entity.hasMany(models.DetailEntity, {
        as: 'detail_entity',
        sourceKey: 'id',
        foreignKey: 'entity_id'
      })
    }
  }
  Entity.init({
    entity_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    province: DataTypes.STRING,
    city_regency: DataTypes.STRING,
    sub_regency: DataTypes.STRING,
    address: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Entity',
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'Entities', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'Entities', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'Entities', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return Entity;
};