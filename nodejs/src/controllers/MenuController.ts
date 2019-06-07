import { Get, Param, Post, JsonController, Body, UseBefore, Delete } from "routing-controllers";

import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { globalParams } from "../globalParams";
import * as util from "util";
import { aws } from "../aws";
import { Menu  } from "../entities/Menu";
import { menuDAO } from "../persistences/MenuDAO"; // FOR FAKING TIMEOUT
import { sequelize } from "../sequelize";

const BASEURL : string = "/ge_menu";

@JsonController()
export class MenuController {

  @Get(BASEURL + "/getAll")
  getAll() {
    return menuDAO.getAll();
  }

  @UseBefore(AuthMiddleware)
  @Post(BASEURL)
  save(@Body() rol: Menu) {
    return menuDAO.save(rol).then((savedRol) => {
      return savedRol;
    });
  }

  @Delete(BASEURL + "/:idrole")
  remove(@Param("idrole") idrole: number) {
    return menuDAO.delete(idrole).then((rol) => {
      return rol;
    });
  }

  /*@Delete(BASEURL + "/:idrole")
  borrar(@Param("idrole") idrole: number) {
    return roleMenuDAO.delete(idrole).then((rol) => {
      return rol;
    });
  }*/
}
