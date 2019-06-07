import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { carteraDAO } from "../persistences/CarteraDAO"
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/cartera";

@JsonController()
export class CarteraController {

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return carteraDAO.getById(id);
  }

  @Get(BASEURL + "/getPrueba/:codcliente")
  getPrueba(@Param("codcliente") codcliente: string) {
    return carteraDAO.getPrueba(codcliente);
  }

  @Get(BASEURL + "/getCartera/:codcliente")
  getCartera(@Param("codcliente") codcliente: string) {
    return carteraDAO.getCartera(codcliente);
  }

  @Get(BASEURL + "/getAuxCartera/:fecha/:fechafin/:cliente")
  getAuxCartera(@Param("fecha") fecha: string,@Param("fechafin") fechafin: string,@Param("cliente") codcliente: string) {
    return carteraDAO.getAuxCartera(fecha,fechafin,codcliente);
  }

  @Post(BASEURL + "/getAll")
  getAll(@Body() body) {
    return carteraDAO.getAll().then((users)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return users; 
      });
    });
  }

  @Delete(BASEURL + "/:id")
  delete(@Param("id") id: number) {
    return carteraDAO.delete(id).then((user) => {
      return user;
    });
  }
  
}
