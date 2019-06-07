import { utilsDAO } from "./utils/UtilsDAO";
import { Menu } from "../entities/Menu";
import { sequelize } from "../sequelize";

class MenuDAO {

  include : Array<object> = [];

  save(rol : Menu) {
    return utilsDAO.save(rol, Menu).then((savedRol)=>{
      return savedRol;
    });
  }

  getAll() {
    return Menu.findAll({
        include: this.include
    });
  }

  delete(idrole: number) {
    return Menu.destroy({
      where: {idrole: idrole}
    })
  }

};

export const menuDAO = new MenuDAO();