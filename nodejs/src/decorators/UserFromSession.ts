import {createParamDecorator} from "routing-controllers";
import * as fs from "fs";
var jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');

export function UserFromSession(options?: { required?: boolean }) {
    return createParamDecorator({
        required: options && options.required ? true : false,
        value: action => {

          const token = action.request.headers["authorization"];
          
          const tokenSplit = token.split(".");
          // console.log("token - split", tokenSplit);

          const RSA_PUBLIC_KEY = fs.readFileSync('./src/sslcert/jwt.key');

          // const checkIfAuthenticated = expressJwt({
          //     secret: RSA_PUBLIC_KEY,
          //     algorithms: ['RS256']
          // });
          
          return jwt.verify(token, fs.readFileSync('./src/sslcert/jwt.key'), function(err, payload){
            if(!err){
              return payload.user;
            }
            else{
              console.error(err);
              return undefined;
            }            
          });

          // return database.findUserByToken(token);       
          // return database.findUserByToken(token);
        }
    });
}