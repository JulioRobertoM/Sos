import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { referenciaDAO } from "../persistences/ReferenciasDAO"
import { Referencias } from "../entities/Referencias";
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { SOS } from "../entities/SOS";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/referencias";

@JsonController()
export class ReferenciasController {

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return referenciaDAO.getById(id);
  }

  /*@Get(BASEURL + "/getAll")
  public getAll() {
    return referenciaDAO.getAll();
  }*/

  @Get(BASEURL + "/getPrecios/:id")
  public getPrecios(@Param("id") id: number) {
    return referenciaDAO.getPrecios(id);
  }

 @Post(BASEURL + "/getAll")
  getAll(@Body() body) {
    return referenciaDAO.getAll().then((productos)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return productos; 
      });
    });
  }

  @Post(BASEURL)
  save(@Body() producto: Referencias) {
    return referenciaDAO.save(producto).then((producto) => {
      return producto;
    });
  }

  @Delete(BASEURL + "/:id")
  delete(@Param("id") id: number) {
    return referenciaDAO.delete(id).then((producto) => {
      return producto;
    });
  }
  
}
