import { User } from "../entities/User";
import { utilsDAO } from "./utils/UtilsDAO";
import { SOS } from "../entities/SOS";
import { Rol } from "../entities/Rol";

class UserDAO {

  public include: object[] = [
    { model: Rol, required: true },
  ];

  save(user : User) {
    user = utilsDAO.setForeignKeys(user, User);
    return utilsDAO.save(user, User).then((savedUser)=>{
      return savedUser;
    });
  }

  getAll({ limit, offset }) {

    return User.findAll({
      include: this.include,
      //attributes: { exclude: Object.keys(User.foreignKeys)},
      order: [
        ['id', 'DESC']
      ]
    });
  }

  getById(id: number) {
    return User.findOne({
      where: {id},
      include: this.include,
    });
  }
  
  getByUsernamePassword({username, password}) {
    return User.findOne({
      raw: true,
      where: {login: username, password}
      // include: this.include,
    });
  }

  delete(id: number) {
    return User.destroy({
      where: {id}
    })
  }

};

export const userDAO = new UserDAO();