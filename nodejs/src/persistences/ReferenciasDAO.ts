import { Referencias } from "../entities/Referencias";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { Precios } from "../entities/Precios";
import { preciosDAO } from "./PreciosDAO";

class ReferenciaDAO {

  public include: object[] = [
  ];

  save(producto : Referencias) {
    //pedido = utilsDAO.setForeignKeys(producto, Pedido);
    return utilsDAO.save(producto, Referencias).then((savedPedido)=>{
      return savedPedido;
    });
  }

  getAll() {
    let data = Referencias.findAll({
      include: this.include,
      where: {noactiva: 0},
      order: [
        ['descr', 'ASC']
      ]
    });
    //data = data.filter((row: Referencias) => (row.precio &&
    //  (row.p.iidtablaprecio === idtabla)));
      
    return data;
  }

  public getPrecios(id: number) {
    return Referencias.findAll({
      include: this.include,
      where: {id},
      order: [
        ['id', 'ASC']
      ]
    });
  }

  getById(id: number) {
    return Referencias.findOne({
      where: {id},
      include: this.include,
    });
  }
  
  delete(id: number) {
    return Referencias.update(
      { noactiva: 1 },
      { where: { id } },
    );
  }

};

export const referenciaDAO = new ReferenciaDAO();