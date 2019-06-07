import { Cliente } from "../entities/Cliente";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";

class ClienteDAO {

  include : Array<object> = [
  ];

  save(cliente : Cliente) {
    //pedido = utilsDAO.setForeignKeys(pedido, Pedido);
    return utilsDAO.save(cliente, Cliente).then((savedPedido)=>{
      return savedPedido;
    });
  }

  getAll() {
    return Cliente.findAll({
      include: this.include,
      order: [
        ['nombrecli', 'ASC']
      ]
    });
  }

  getById(id: number) {
    return Cliente.findOne({
      where: {id},
      include: this.include,
    });
  }
  
  delete(id: number) {
    return Cliente.destroy({
      where: {id}
    })
  }

};

export const clienteDAO = new ClienteDAO();