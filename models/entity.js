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
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Entity',
  });
  return Entity;
};