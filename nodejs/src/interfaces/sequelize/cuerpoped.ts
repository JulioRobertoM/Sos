import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {pcuerpoInstance, pcuerpoAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<pcuerpoInstance, pcuerpoAttribute>('cuerpoped', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idcabeza: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    idreferencia: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    comencpo: {
      type: DataTypes.STRING(100),
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
    idprecio: {
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
    tableName: 'cuerpomov'
  });
};

