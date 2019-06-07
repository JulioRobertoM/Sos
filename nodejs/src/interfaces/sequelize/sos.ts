/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {sosInstance, sosAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<sosInstance, sosAttribute>('sos', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tm: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ''
    },
    prefijo: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ''
    },
    consecutivo: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    pagenumber: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sos'
  });
};
