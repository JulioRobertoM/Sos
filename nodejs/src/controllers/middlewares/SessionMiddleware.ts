import {ExpressMiddlewareInterface} from "routing-controllers";

import * as fs from "fs";
var config = require('./config');
var expressJwt = require('express-jwt');

export class SessionMiddleware implements ExpressMiddlewareInterface {

  // use(request: any, response: any, next?: (err?: any) => any): any {
  //   console.log("SESSION do something...");

  //   const checkIfAuthenticated = expressJwt({
  //     secret: config.TOKEN_SECRET
  //   });

  //   console.log("checkIfAuthenticated", checkIfAuthenticated);
    
  //   next();
  // }

  use(){

    const RSA_PUBLIC_KEY = fs.readFileSync('./src/sslcert/jwt.key');

    const checkIfAuthenticated = expressJwt({
        secret: RSA_PUBLIC_KEY
    });

    return checkIfAuthenticated();

  }

}