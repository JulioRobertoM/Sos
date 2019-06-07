import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { baseconoDAO } from "../persistences/BaseConoDAO"
import { BaseCono } from "../entities/Basecono";
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { SOS } from "../entities/SOS";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/basecono";

@JsonController()
export class BaseConoController {

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return baseconoDAO.getById(id);
  }

  @Post(BASEURL + "/getAll")
  getAllxx() {
    return baseconoDAO.getAll()
  }
  
  @Post(BASEURL + "/getAll")
  getAll() {
    return baseconoDAO.getAll().then((basecono)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return basecono; 
      });
    });
  }
  @Post(BASEURL)
  save(@Body() basecono: BaseCono) {
    return baseconoDAO.save(basecono).then((basecono) => {
      return basecono;
    });
  }

  @Delete(BASEURL + "/:id")
  delete(@Param("id") id: number) {
    return baseconoDAO.delete(id).then((basecono) => {
      return basecono;
    });
  }
  
}
