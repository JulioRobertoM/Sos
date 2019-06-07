import { QuerysServerOutside } from "../QuerysServer";
import { sequelize } from "../sequelize";

class KardexDAO {

  include : Array<object> = [
  ];

  getExistencias(fecha: string,codr: string) {
    let cartera = new QuerysServerOutside;  
    let consulta = cartera.getExistencias(fecha,codr); 
    return sequelize.query(consulta,{replacements: { 
      fecha: fecha }, type: sequelize.QueryTypes.SELECT });
  }

};

export const kardexDAO = new KardexDAO();