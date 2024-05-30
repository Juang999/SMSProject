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
  });
  return DetailEntity;
};