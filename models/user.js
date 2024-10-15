'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Student, {
        as: 'data_student',
        targetKey: 'id',
        foreignKey: 'student_id',
      })

      User.hasOne(models.UserHasRole, {
        as: 'user_has_role',
        sourceKey: 'id',
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    student_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      afterCreate: ({dataValues}) => {
        Logging.info({message: 'created', ut_tablename: 'Users', ut_data: dataValues, ut_error: null});
      },
      afterUpdate: ({dataValues}) => {
        Logging.info({message: 'updated', ut_tablename: 'Users', ut_data: dataValues, ut_error: null});
      },
      afterDestroy: ({dataValues}) => {
        Logging.info({message: 'deleted', ut_tablename: 'Users', ut_data: dataValues, ut_error: null});
      }
    }
  });
  return User;
};