import { Request, Response } from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { pedidoDAO } from "../persistences/PedidoDAO"
import { Pedido } from "../entities/Pedido";
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";
import { SOS } from "../entities/SOS";
import { sosDAO } from "../persistences/SOSDAO";
import { Cuerpoped } from "../entities/Cuerpoped";
import { User } from "../entities/User";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/pedidos";

@JsonController()
export class PedidoController {

  @Get(BASEURL + "/getById/:id")
  public getById(@Param("id") id: number) {
    return pedidoDAO.getById(id);
  }

  @Post(BASEURL + "/getAll")
  public getAll(@Body() body) {
    return pedidoDAO.getAll().then((pedidos)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return pedidos; 
      });
    });
  }

  @Post(BASEURL)
  public save(@Body() pedido: Pedido, @UserFromSession() currentUser: User) {
    const isNew = !pedido.id;      
    return pedidoDAO.save(pedido, currentUser).then((pedido) => {
      if (isNew) {
        // INCREASE CONSECUTIVE
        sosDAO.increaseConsecutive();
      }
      return pedido;
    });
  }

  @Delete(BASEURL + "/delete/:id")
  public delete(@Param("id") id: number) {
    return pedidoDAO.delete(id).then((pedido) => {
      return pedido;
    });
  }
  
  @Delete(BASEURL + "/bloquear/:id")
  public bloquear(@Param("id") id: number) {
    return pedidoDAO.bloquear(id).then((pedido) => {
      return pedido;
    });
  }
  
  @Post(BASEURL + "/savecuerpo")
  public savecuerpo(@UserFromSession() currentUser: User, @Body() cuerpopedido: Cuerpoped) {
    return pedidoDAO.savecuerpo(cuerpopedido, currentUser);
  }

  @Get(BASEURL + "/getAllcuerpo/:id")
  public getAllcuerpo(@Param("id") id: number) {
    return pedidoDAO.getAllcuerpo(id);
  }

  @Delete(BASEURL + "/deletecuerpo/:id")
  public deletecuerpo(@Param("id") id: number) {
    return pedidoDAO.deletecuerpo(id).then((pcuerpo) => {
      return pcuerpo;
    });
  }

  @Post(BASEURL + "/getGraphs")
  public getGraphs() {
    return pedidoDAO.getAll().then((pedidos)=>{
      return pedidos; 
    });
  }

  @Post(BASEURL + "/getGraphs")
  public getGraphsxx(@Body() body) {
    return pedidoDAO.getAll().then((pedidos)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return pedidos; 
      });
    });
  }
}
