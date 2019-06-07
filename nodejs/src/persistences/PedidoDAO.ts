import * as sequelize from "sequelize";
import {Sequelize} from "sequelize-typescript/lib/models/v4/Sequelize";
import { Pedido } from "../entities/Pedido";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { Cliente } from "../entities/Cliente";
import { User } from "../entities/User";
import { Tablaprecio } from "../entities/Tablaprecio";
import { Cuerpoped } from "../entities/Cuerpoped";
import { Referencias } from "../entities/Referencias";
import { Precios } from "../entities/Precios";

const Op = Sequelize.Op;

class PedidoDAO {

  public include: object[] = [
    { model: Cliente, required: true },
    { model: Tablaprecio, required: true },
    { model: User, required: true },
    {
      model: Cuerpoped, required: false,
      include: [
        { model: Referencias, required: false },
        { model: Tablaprecio, required: false },
        { model: User, required: false },
        { model: Precios, required: false }],
        as: "cuerpoped",
    },
  ];

  public includecpo: object[] = [
    { model: Referencias, required: false },
    { model: Tablaprecio, required: false },
    { model: User, required: false },
    { model: Precios, required: false }
  ];

  public save(pedido: Pedido, currentUser: User) {
    //pedido = utilsDAO.setForeignKeys(pedido, Pedido);
    pedido.usuario = currentUser;
    return utilsDAO.save(pedido, Pedido).then((savedPedido)=>{
      return savedPedido;
    });
  }

  public getAll() {
    return Pedido.findAll({
      include: this.include,
      where: {estado: {[Op.or]: ['0', 'C']}},
      order: [
        ['id', 'DESC']
      ]
    });
  }

  public getById(id: number) {
    return Pedido.findOne({
      include: this.include,
      where: {id},
    });
  }
  
  /*public delete(id: number) {
    return Pedido.destroy({
      where: {id}
    })
  }*/

  public delete(id: number ) {
    return Pedido.update(
      { estado: "A" },
      { where: { id } },
    );
  }

  public bloquear(id: number ) {
    return Pedido.update(
      { estado: "C" },
      { where: { id } },
    );
  }

  public savecuerpo(pcuerpo: Cuerpoped, currentUser: User) {
    pcuerpo.usuario = currentUser;
    pcuerpo.referencia = pcuerpo.precio.producto;
    //pcuerpo = utilsDAO.setForeignKeys(pcuerpo, Cuerpoped);
    
    return utilsDAO.save(pcuerpo, Cuerpoped).then((savedRSO) => {
      return savedRSO;
    });
  }

  public getAllcuerpo(id: number) {
    return Cuerpoped.findAll({
      include: this.includecpo,
      where: {idcabeza: id},
    });
  }

  public deletecuerpo(id: number) {
    return Cuerpoped.destroy({
      where: {id},
    });
  }

};

export const pedidoDAO = new PedidoDAO();