import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {rolInstance, rolAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<rolInstance, rolAttribute>('ge_rol', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombrerol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
  }, 
  {
    tableName: 'ge_rol'
  });
};
