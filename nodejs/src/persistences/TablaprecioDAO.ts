import { Tablaprecio } from "../entities/Tablaprecio";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";

class TablaprecioDAO {

  include : Array<object> = [
  ];

  save(tablaprecio : Tablaprecio) {
    //pedido = utilsDAO.setForeignKeys(pedido, Pedido);
    return utilsDAO.save(tablaprecio, Tablaprecio).then((savedPedido)=>{
      return savedPedido;
    });
  }

  getAll() {
    return Tablaprecio.findAll({
            include: this.include,
            order: [
              ['codigo', 'ASC']
            ]
          });
  }

  getById(id: number) {
    debugger;
    return Tablaprecio.findOne({
            where: {id},
            include: this.include,
          });
  }
  
  delete(id: number) {
    return Tablaprecio.destroy({
            where: {id}
          })
  }

};

export const tablaprecioDAO = new TablaprecioDAO();