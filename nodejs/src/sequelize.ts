import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: 'sospedidoweb',
  dialect: 'mysql',
  port: 3306,
  username: process.env.NODEJS_SEQUELIZE_USERNAME,
  password: process.env.NODEJS_SEQUELIZE_PASSWORD,
  modelPaths: [__dirname + '/entities'],
  operatorsAliases: false,
  logging: false
});
