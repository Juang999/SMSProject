'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Periode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Periode.init({
    periode_code: {
      type: DataTypes.STRING,
      unique: true
    },
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    is_active: DataTypes.BOOLEAN,
    year: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Periode',
    schema: 'public',
  });
  return Periode;
};