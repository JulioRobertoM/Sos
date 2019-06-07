import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { BaseCono } from "../entities/BaseCono";

class BaseConoDAO {

  public include: object[] = [
  ];

  save(producto : BaseCono) {
    //pedido = utilsDAO.setForeignKeys(producto, Pedido);
    return utilsDAO.save(producto, BaseCono).then((savedPedido)=>{
      return savedPedido;
    });
  }

  getAll() {
    return BaseCono.findAll({
      where: {noactiva: 0},
      include: this.include,
      order: [
        ['id', 'ASC']
      ],
    });
  }

  getById(id: number) {
    return BaseCono.findOne({
      where: {id},
      include: this.include,
    });
  }
  
  delete(id: number) {
    return BaseCono.update(
      { noactiva: 1 },
      { where: { id } },
    );
  }

};

export const baseconoDAO = new BaseConoDAO();