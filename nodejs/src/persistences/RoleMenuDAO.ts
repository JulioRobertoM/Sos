import { utilsDAO } from "./utils/UtilsDAO";
import { RoleMenu } from "../entities/RoleMenu";
import { Rol } from "../entities/Rol";
import { sequelize } from "../sequelize";
import { Menu } from "../entities/Menu";
import { QuerysServerOutside } from "../QuerysServer";

class RoleMenuDAO {

  /*public include: object[] = [
    { model: Menu, required: true },
  ];*/
  include : Array<object> = [];

  save(rol : RoleMenu) {
    return utilsDAO.save(rol, RoleMenu).then((savedRol)=>{
      return savedRol;
    });
  }

  getAll(idrole: number) {
    return RoleMenu.findAll({
      include: this.include,
      where: {idrole: idrole}
    });
  }

  delete(idrole: number) {
    return RoleMenu.destroy({
      where: {idrole: idrole}
    })
  }

  getMenu(idrole: number,codigo: string) {
    return RoleMenu.findOne({
      where: {idrole: idrole, codigo: codigo},
      include: this.include,
    });
  }

  getRolMenu(idrole: number) {
    let cartera = new QuerysServerOutside;  
    let consulta = cartera.getRolMenu(idrole); 
    return sequelize.query(consulta,{replacements: { 
      idrole: idrole }, type: sequelize.QueryTypes.SELECT });
  }

};

export const roleMenuDAO = new RoleMenuDAO();