import { Get, Param, Post, JsonController, Body, UseBefore, Delete } from "routing-controllers";

import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { globalParams } from "../globalParams";
import * as util from "util";
import { aws } from "../aws";
import { Rol } from "../entities/Rol";
import { rolDAO } from "../persistences/RolDAO"; // FOR FAKING TIMEOUT
import { sequelize } from "../sequelize";

const BASEURL : string = "/rol";

@JsonController()
export class RolController {

  @Get(BASEURL + "/getAll")
  getAll() {
    return rolDAO.getAll();
  }

  @UseBefore(AuthMiddleware)
  @Post(BASEURL)
  save(@Body() rol: Rol) {
    return rolDAO.save(rol).then((savedRol) => {
      return savedRol;
    });
  }

  /*@Delete(BASEURL + "/:idrole")
  remove(@Param("idrole") idrole: number) {
    return rolDAO.delete(idrole).then((rol) => {
      return rol;
    });
  }*/

  @Delete(BASEURL + "/delete/:id")
  delete(@Param("id") id: number) {
    return rolDAO.delete(id).then((delrol) => {
      return delrol;
    });
  }

  /*@Delete(BASEURL + "/:idrole")
  borrar(@Param("idrole") idrole: number) {
    return roleMenuDAO.delete(idrole).then((rol) => {
      return rol;
    });
  }*/
}
