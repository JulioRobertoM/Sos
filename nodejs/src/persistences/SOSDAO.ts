import { Sequelize } from "sequelize-typescript";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { sequelize } from "../sequelize";

class SOSDAO {

  // include : Array<object> = [
  //   { model: SOS, required: true },
  //   { model: AircraftModel, required: true },
  //   { model: Company, required: true }
  // ];

  public save(sos : SOS) {
    //sos = utilsDAO.setForeignKeys(sos, SOS);
    return utilsDAO.save(sos, SOS).then((savedSOS)=>{
      return savedSOS;
    });
  }

  /*increaseConsecutive(idSOS : number){
    return sequelize.query(`
      UPDATE sos SET consecutivo = consecutivo + 1 WHERE sos.id = ?`,
      { replacements: [ idSOS ], type: sequelize.QueryTypes.UPDATE }
    );
  }*/

  public increaseConsecutive() {
    
    return SOS.findOne({
      //where: {idLicense},
      //include: this.include,
    }).then((sos: SOS) => {
      return SOS.update(
        { consecutivo: Sequelize.literal("consecutivo + 1") },
        { where: { tm: "PV"} },
      );
    });

  }

  get(id: number) {
    return SOS.findOne({
            where: {id},
    });
  }

  getAll() {

    return SOS.findAll({
            // include: this.include,
            order: [
              ['id', 'DESC']
            ]
            // limit,
            // offset
          });
  }

  getById(id: number) {

    return SOS.findOne({
            where: {id},
            // include: this.include,
          });
  }

  delete(id: number) {
    return SOS.destroy({
            where: {id}
          })
  }

};

export const sosDAO = new SOSDAO();