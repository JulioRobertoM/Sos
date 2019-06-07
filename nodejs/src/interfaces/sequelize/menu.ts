import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {rolInstance, rolAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<rolInstance, rolAttribute>('ge_menu', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    depende: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    nombremenu: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
  }, 
  {
    tableName: 'ge_menu'
  });
};