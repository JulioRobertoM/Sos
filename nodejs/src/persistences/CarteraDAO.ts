import { Cliente } from "../entities/Cliente";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { QuerysServerOutside } from "../QuerysServer";
import { sequelize } from "../sequelize";

class CarteraDAO {

  include : Array<object> = [
  ];

  getAll() {
    return Cliente.findAll({
      include: this.include,
      order: [
        ['codcli', 'ASC']
      ]
    });
  }

  getAuxCartera(fecha: string, fechafin:string, codcliente:string) {
    let cartera = new QuerysServerOutside;  
    let consulta = cartera.getAuxCartera(fecha,fechafin,codcliente); 
    return sequelize.query(consulta,{replacements: { 
      cliente: codcliente }, type: sequelize.QueryTypes.SELECT });
  }

  getCartera(codcliente:string) {
    let cartera = new QuerysServerOutside;  
    let consulta = cartera.getCartera(codcliente); 
    return sequelize.query(consulta,{replacements: { 
      cliente: codcliente }, type: sequelize.QueryTypes.SELECT });
  }

  getPrueba(codcliente:string) {
    let cartera = new QuerysServerOutside;  
    let consulta = cartera.getPrueba(codcliente); 
    return sequelize.query(consulta,{replacements: { 
        cliente: codcliente }, type: sequelize.QueryTypes.SELECT });
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

export const carteraDAO = new CarteraDAO();