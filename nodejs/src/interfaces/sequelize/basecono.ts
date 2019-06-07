import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {baseconoInstance, baseconoAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<baseconoInstance, baseconoAttribute>('basecono', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bctitulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    bcmensaje: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: '',
    },
    noactiva: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, 
  {
    tableName: 'basecono'
  });
};
