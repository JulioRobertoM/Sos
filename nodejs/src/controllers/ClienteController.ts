import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { clienteDAO } from "../persistences/ClienteDAO"
import { Cliente } from "../entities/Cliente";
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { SOS } from "../entities/SOS";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/clientes";

@JsonController()
export class ClienteController {

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return clienteDAO.getById(id);
  }

  @Post(BASEURL + "/getAll")
  getAll(@Body() body) {
    return clienteDAO.getAll().then((users)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return users; 
      });
    });
  }

  @Post(BASEURL)
  save(@Body() cliente: Cliente) {
    return clienteDAO.save(cliente).then((user) => {
      return user;
    });
  }

  @Delete(BASEURL + "/:id")
  delete(@Param("id") id: number) {
    return clienteDAO.delete(id).then((user) => {
      return user;
    });
  }
  
}
