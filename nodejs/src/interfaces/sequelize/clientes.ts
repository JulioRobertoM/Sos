import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {clientesInstance, clientesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<clientesInstance, clientesAttribute>('clientes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codcli: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombrecli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    digitocli: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ''
    },
    direccioncli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    tipdoccli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    numdoccli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    telefonocli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    emailcli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    codciudadcli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    comencli: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    vendedor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
  }, 
  {
    tableName: 'geclientes'
  });
};
