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
      Periode.hasMany(models.DetailPeriode, {
        as: 'detail_periode',
        sourceKey: 'id',
        foreignKey: 'periode_id'
      })
    }
  }
  Periode.init({
    periode_code: {
      type: DataTypes.STRING,
      unique: true
    },
    start_year: DataTypes.INTEGER,
    end_year: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Periode',
    schema: 'public',
    paranoid: true
  });
  return Periode;
};