import { ExpressMiddlewareInterface } from "routing-controllers";
import * as fs from "fs";
var jwt = require('jsonwebtoken');

export class AuthMiddleware implements ExpressMiddlewareInterface { // interface implementation is optional

  use(request: any, response: any, next?: (err?: any) => any): any {

    const token = request.headers["authorization"];

    jwt.verify(token, fs.readFileSync('./src/sslcert/jwt.key'), function(err, payload){
      if(!err){
        next();
      }
      else{
        response.status(401);
        next("Acceso no autorizado");
      }
    });
  }

}