import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {referenciasInstance, referenciasAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<referenciasInstance, referenciasAttribute>('referencias', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codr: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    unid: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '',
    },
    noactiva: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
    },
    afeinv: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    comentario: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: '',
    },
  }, 
  {
    tableName: 'inrefinv'
  });
};
