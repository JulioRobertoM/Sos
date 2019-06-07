import { utilsDAO } from "./utils/UtilsDAO";
import { Rol } from "../entities/Rol";
import { sequelize } from "../sequelize";

class RolDAO {

  include : Array<object> = [];

  save(rol : Rol) {
    return utilsDAO.save(rol, Rol).then((savedRol)=>{
      return savedRol;
    });
  }

  getAll() {
    return Rol.findAll({
        include: this.include
    });
  }

  delete(idrole: number) {
    return Rol.destroy({
      where: {idrole: idrole}
    })
  }
};

export const rolDAO = new RolDAO();