import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { kardexDAO } from "../persistences/KardexDAO"
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/kardex";

@JsonController()
export class KardexController {

  @Get(BASEURL + "/getExistencias/:fecha/:codr")
  getExistencias(@Param("fecha") fecha: string,@Param("codr") codr: string) {
    return kardexDAO.getExistencias(fecha,codr);
  }

}
