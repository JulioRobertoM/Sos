import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {preciosInstance, preciosAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<preciosInstance, preciosAttribute>('precios', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idreferencia: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    idtablaprecio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, 
  {
    tableName: 'precios'
  });
};
