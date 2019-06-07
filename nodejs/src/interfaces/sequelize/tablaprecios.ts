import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {tablaprecioInstance, tablaprecioAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<tablaprecioInstance, tablaprecioAttribute>('tablaprecios', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
  }, 
  {
    tableName: 'tablaprecios'
  });
};
