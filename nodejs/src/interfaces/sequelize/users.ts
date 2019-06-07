/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {usersInstance, usersAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<usersInstance, usersAttribute>('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    apellido: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ''
    },
    cargo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    direccion: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: ''
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: ''
    },
    idempresa: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    idrole: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
  }, 
  {
    tableName: 'geusuarios'
  });
};
