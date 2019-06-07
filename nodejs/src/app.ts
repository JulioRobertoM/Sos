import * as express from "express";
import * as path from "path";
import "reflect-metadata"; // this shim is required
import { createExpressServer, useExpressServer } from "routing-controllers";
import { sequelize } from "./sequelize";
import  *  as indexControllers from "./controllers";
import { aws } from "./aws";
const cors = require('cors')
const bodyParser = require('body-parser');

export class App {

  app: express.Application;
  controllers = [];

  constructor() {

    sequelize.authenticate().then(() => {

      //CONTROLLERS
      for(let control in indexControllers){
        this.controllers.push(indexControllers[control]);
      }

      this.app = express();

      // view engine setup
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.engine('html', require('ejs').renderFile);
      this.app.set('view engine', 'html');
      this.app.use(express.static(__dirname + '/views'));

      this.app.use(cors());
      this.app.use(bodyParser.json({limit: '50mb'}));
      this.app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

      useExpressServer(this.app, {
        classTransformer: false,      //De esta manera, retorna el objeto de la entidad en lugar del objeto de Mongooose
        routePrefix: 'api',
        controllers: this.controllers // we specify controllers we want to use
        // middlewares: [ LoggingMiddleware ]
      });      

      this.app.get('*', (req, res) => {
        if (!res.headersSent) {
            res.setHeader('Content-Type', 'text/html');
            res.render("index.html")
        }
      });

      // const port = 3000;
      const port = 8080;

      this.app.listen(port, function() {
        console.log(`Express server listening on port ${port}`);

        // ------------- AWS -------------

        // aws.putObjectS3({
        //   Key: "myBucketKey",
        //   Body: `Hello again from a class! => ${new Date()}`
        // })

      });

    });
  }
}

export default new App().app;
