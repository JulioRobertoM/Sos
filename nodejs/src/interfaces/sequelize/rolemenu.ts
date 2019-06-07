import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {rolInstance, rolAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<rolInstance, rolAttribute>('ge_rolmenu', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idrole: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '',
    },
    codigo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
      },
  }, 
  {
    tableName: 'ge_rolmenu'
  });
};
