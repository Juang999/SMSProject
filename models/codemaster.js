'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CodeMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CodeMaster.init({
    code_field: DataTypes.STRING,
    code_code: DataTypes.STRING,
    code_name: DataTypes.STRING,
    code_description: DataTypes.TEXT,
    code_is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CodeMaster',
    paranoid: true,
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'CodeMasters', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'CodeMasters', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'CodeMasters', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return CodeMaster;
};