import { Get, Param, Post, JsonController, Body, UseBefore, Delete } from "routing-controllers";
import { sosDAO } from "../persistences/SOSDAO"
import { User } from "../entities/User";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { SOS } from "../entities/SOS";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const BASEURL : string = "/SOS";

@JsonController()
export class SOSController {

  @Get(BASEURL + "/get")
  get(@UserFromSession() currentUser: User) {
    return sosDAO.getById(currentUser.idempresa).then(
      SOS => SOS
    );
  }

  @Get(BASEURL + "/getAll")
  getAll() {
    return sosDAO.getAll().then((aircrafts)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return aircrafts; 
      });
    });
  }

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return sosDAO.getById(id);
  }

  @Post(BASEURL)
  save(@Body() sos: SOS) {
    return sosDAO.save(sos).then((sos) => {
      return sos;
    });
  }

  @Delete(BASEURL + "/:id")
  remove(@Param("id") id: number) {
    return sosDAO.delete(id).then(sos => sos);
  }

}