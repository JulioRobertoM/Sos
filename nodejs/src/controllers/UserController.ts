import {Request, Response} from "express";
import {JsonController, Param, Body, Get, Post, Delete, Req, Res, HeaderParam, UseBefore } from "routing-controllers";
import { userDAO } from "../persistences"
import { User } from "../entities/User";
import * as fs from "fs";
import { UserFromSession } from "../decorators/UserFromSession";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { SOS } from "../entities/SOS";

import * as util from "util"; // FOR FAKING TIMEOUT 
import { globalParams } from "../globalParams";

const jwt = require('jsonwebtoken');

const BASEURL : string = "/users";

@JsonController()
export class UserController {

  @Get(BASEURL + "/refreshSession")
  refreshSession(@Req() request: Request, @Res() response: Response, 
                 @UserFromSession() usuario: User) {
    return this.getToken(usuario);
  }

  @Post(BASEURL + "/getSession")
  getSession(@Body() {username, password}) {

    return userDAO.getByUsernamePassword({username, password}).then((usuario: User)=>{

      if(!usuario){
        throw `No coincide el usuario '${username}' con la contraseña '${password}'`;
      }

      return this.getToken(usuario);

    })
  }

  @UseBefore(AuthMiddleware)
  @Get(BASEURL + "/useSession")
  useSession(@HeaderParam("authorization") token: string, @UserFromSession() usuario: User){
    if(!usuario){
      console.error("NO HAY USUARIO!", usuario);
      return ":("
    }
    else{
      console.log("useSession - usuario", usuario);
      return "YAY!"
    }
  }

  @Get(BASEURL + "/getById/:id")
  getById(@Param("id") id: number) {
    return userDAO.getById(id);
  }

  @Get(BASEURL + "/getCurrentUser")
  getCurrentUser(@UserFromSession() currentUser: User) {
    return userDAO.getById(currentUser.id);
  }

  @Post(BASEURL + "/getAll")
  getAll(@Body() body) {
    return userDAO.getAll(body).then((users)=>{
      return util.promisify(setTimeout)(globalParams.debug ? globalParams.timeout : 0).then((value) => {
        return users; 
      });
    });
  }

  @Post(BASEURL)
  save(@Body() user: User, @UserFromSession() currentUser: User) {
    return userDAO.save(user).then((user) => {
      return user;
    });
  }

  @Delete(BASEURL + "/:id")
  delete(@Param("id") id: number) {
    return userDAO.delete(id).then((user) => {
      return user;
    });
  }

  getToken(user : User){

    const RSA_PRIVATE_KEY = fs.readFileSync('./src/sslcert/jwt.key');
    // const sessionExpiresIn = (3600) * (24) * (2); //2 días
    const sessionCreatedAt = new Date().getTime();
    
    const sessionToken = jwt.sign({ user }, RSA_PRIVATE_KEY, {
      // expiresIn: sessionExpiresIn,
      subject: user.id.toString()
    });

    delete user.id;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return {
             sessionToken, 
            //  sessionExpiresIn: sessionExpiresIn * 1000, //IN MILLISECONDS 
             sessionCreatedAt, 
             user
           };
  }

}
