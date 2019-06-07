import { Get, Param, Post, JsonController, Body, UseBefore, Delete } from "routing-controllers";

import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { globalParams } from "../globalParams";
import * as util from "util";
import { aws } from "../aws";
import { RoleMenu  } from "../entities/RoleMenu";
import { roleMenuDAO } from "../persistences/RoleMenuDAO"; // FOR FAKING TIMEOUT
import { sequelize } from "../sequelize";
import { User } from "../entities/User";

const BASEURL : string = "/rolmenu";

@JsonController()
export class RoleMenuController {

  @Get(BASEURL + "/getAll/:idrole")
  getAll(@Param("idrole") idrole: number) {
    return roleMenuDAO.getAll(idrole);
  }

  @UseBefore(AuthMiddleware)
  @Post(BASEURL)
  save(@Body() rol: RoleMenu) {
    return roleMenuDAO.save(rol).then((savedRol) => {
      return savedRol;
    });
  }

  @Delete(BASEURL + "/:idrole")
  remove(@Param("idrole") idrole: number) {
    return roleMenuDAO.delete(idrole).then((rol) => {
      return rol;
    });
  }

  @Get(BASEURL + "/getMenu/:idrole/:codigo")
  getMenu(@Param("idrole") idrole: number,@Param("codigo") codigo: string) {
    return roleMenuDAO.getMenu(idrole,codigo);
  }

  @Get(BASEURL + "/getRolMenu/:idrole")
  getRolMenu(@Param("idrole") idrole: number) {
    return roleMenuDAO.getRolMenu(idrole);
  }

}
