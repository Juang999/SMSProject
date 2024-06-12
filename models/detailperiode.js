'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailPeriode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailPeriode.belongsTo(models.Periode, {
        as: 'periode',
        targetKey: 'id',
        foreignKey: 'periode_id'
      })

      DetailPeriode.belongsTo(models.CodeMaster, {
        as: 'semester_code',
        targetKey: 'id',
        foreignKey: 'semester_id'
      })
    }
  }
  DetailPeriode.init({
    semester_id: DataTypes.INTEGER,
    periode_id: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY
  }, {
    sequelize,
    schema: 'public',
    modelName: 'DetailPeriode',
    paranoid: true,
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'DetailPeriodes', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'DetailPeriodes', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'DetailPeriodes', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return DetailPeriode;
};