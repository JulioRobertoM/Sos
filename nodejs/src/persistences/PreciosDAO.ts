import { Pedido } from "../entities/Pedido";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { User } from "../entities/User";
import { Tablaprecio } from "../entities/Tablaprecio";
import { Referencias } from "../entities/Referencias";
import { Precios } from "../entities/Precios";

class PreciosDAO {

  public include: object[] = [
    { model: Referencias, required: true },
    { model: Tablaprecio, required: true },
  ];

  public save(pedido: Pedido, currentUser: User) {
    pedido = utilsDAO.setForeignKeys(pedido, Pedido);
    pedido.usuario = currentUser;
    return utilsDAO.save(pedido, Pedido).then((savedPedido)=>{
      return savedPedido;
    });
  }

  public getPrecios(id: number) {
    return Precios.findAll({
      include: this.include,
      where: {idtablaprecio: id},
      order: [
        ['id', 'ASC']
      ]
    });
  }

  public getAll() {
    return Precios.findAll({
      include: this.include,
      order: [
        ['id', 'DESC']
      ]
    });
  }

  public getById(idreferencia: number,idtablaprecio: number) {
    return Precios.findOne({
      include: this.include,
      where: {idtablaprecio, idreferencia},
    });
  }
  
  public delete(id: number) {
    return Precios.destroy({
      where: {id}
    })
  }

};

export const preciosDAO = new PreciosDAO();