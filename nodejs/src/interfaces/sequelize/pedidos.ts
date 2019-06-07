import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pedidosInstance, pedidosAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pedidosInstance, pedidosAttribute>('pedidos', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tm: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    prefijo: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    documento: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ''
    },
    idcliente: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE(10),
      allowNull: false,
      defaultValue: ''
    },
    hora: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    comen: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    plazo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    vendedor: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    idtablaprecio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
    },
    idusuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: ''
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
    tableName: 'cabezamov'
  });
};
