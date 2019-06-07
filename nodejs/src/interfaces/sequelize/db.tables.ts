// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
    sos:def.sosModel;
    users:def.usersModel;
    pedidos:def.pedidosModel;
    pcuerpo: def.pcuerpoModel;
    clientes:def.clientesModel;
    tablaprecio:def.tablaprecioModel;
    referencias:def.referenciasModel;
    precios:def.preciosModel;
    rol:def.rolModel;
    menu:def.menuModel;
    basecono: def.baseconoModel;
 }

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    sos: seq.import(path.join(__dirname, './sos')),
    users: seq.import(path.join(__dirname, './users')),
    pedidos: seq.import(path.join(__dirname, './pedidos')),
    pcuerpo: seq.import(path.join(__dirname, './cuerpo')),
    clientes: seq.import(path.join(__dirname, './clientes')),
    tablaprecio: seq.import(path.join(__dirname, './tablaprecios')),
    referencias: seq.import(path.join(__dirname, './referencias')),
    precios: seq.import(path.join(__dirname, './precios')),
    rol: seq.import(path.join(__dirname, './ge_rol')),
    menu: seq.import(path.join(__dirname, './ge_menu')),
    basecono: seq.import(path.join(__dirname, './basecono')),
  };
  return tables;
};
