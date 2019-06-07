import { Request, Response } from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { preciosDAO } from "../persistences/PreciosDAO"
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";
import { Precios } from "../entities/Precios";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/precios";

@JsonController()
export class PreciosController {

  @Get(BASEURL + "/getById/:idref/:idtabla")
  public getById(@Param("idref") idref: number,@Param("idtabla") idtabla: number) {
    return preciosDAO.getById(idref,idtabla);
  }

  @Get(BASEURL + "/getPrecios/:id")
  public getPrecios(@Param("id") id: number) {
    return preciosDAO.getPrecios(id);
  }

  @Post(BASEURL + "/getAll")
  public getAll(@Body() body) {
    return preciosDAO.getAll().then((precios)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return precios; 
      });
    });
  }

}
