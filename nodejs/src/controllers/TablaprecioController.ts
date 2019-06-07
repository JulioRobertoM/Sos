import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { tablaprecioDAO } from "../persistences/TablaprecioDAO"
import { Tablaprecio } from "../entities/Tablaprecio";
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { SOS } from "../entities/SOS";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/tablaprecios";

@JsonController()
export class TablaprecioController {

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return tablaprecioDAO.getById(id);
  }

  @Post(BASEURL + "/getAll")
  getAll(@Body() body) {
    return tablaprecioDAO.getAll().then((users)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return users; 
      });
    });
  }

  @Post(BASEURL)
  save(@Body() tablaprecio: Tablaprecio) {
    return tablaprecioDAO.save(tablaprecio).then((user) => {
      return user;
    });
  }

  @Delete(BASEURL + "/:id")
  delete(@Param("id") id: number) {
    return tablaprecioDAO.delete(id).then((user) => {
      return user;
    });
  }
  
}
