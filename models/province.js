'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Province.init({
    province_id: DataTypes.INTEGER,
    province_name: DataTypes.STRING
  }, {
    sequelize,
    schema: 'public',
    modelName: 'Province',
  });
  return Province;
};