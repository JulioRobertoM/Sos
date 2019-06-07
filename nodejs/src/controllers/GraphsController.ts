import { Get, Param, Post, JsonController, UseBefore, Body, Delete } from "routing-controllers";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { UserFromSession } from "../decorators/UserFromSession";
import { globalParams } from "../globalParams";
import * as util from "util"; // FOR FAKING TIMEOUT
import moment = require("moment");
import Bluebird = require("bluebird");
import { User } from "../entities/User";
import { chartsDAO } from "../persistences/ChartsDAO";

const BASEURL : string = "/graphs";

@JsonController()
export class GraphsController {

  @Get(BASEURL + "/get/:mark/:time")
  getAll(@UserFromSession() currentUser: User, @Param("mark") mark: string, @Param("time") time: string) {

    let response;

    return response = new Promise((resolve, reject)=> {
      switch(time) {
        case "d": {
          resolve(this.getRecordsChartsDay(mark, currentUser));
          break;
        }
        case "w": {
          resolve(this.getRecordsChartsWeek(mark, currentUser));
          break;
        }
        case "m": {
          resolve(this.getRecordsChartsMonth(mark, currentUser));
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  getRecordsChartsDay(mark: string, currentUser: User): any{

      let from = new Date();
      from.setUTCHours(0,0,0,0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setMilliseconds(0);
      let recordsGraphs = [];
      for (let i = 0; i < 24; i++) {
        const put = {
          key: i,
          total: 0
        };
        recordsGraphs.push(put);
      }
      let a;
      return a = new Promise((resolve, reject) => {
        resolve(chartsDAO.getGraphs(mark, from, currentUser));
      }).then((recordsAll: Array<any>) => {
        let a;
        return a = new Promise((resolve, reject) => {
          if (recordsAll.length > 0) {
            recordsAll.forEach((recordOne: any, key, arr) => {
              const dateRecord = new Date(recordOne.fecha);
              const hour = dateRecord.getUTCHours();
              recordsGraphs[recordsGraphs.findIndex((rec) => rec.key === hour)].total++;
              if (Object.is(arr.length - 1, key)) {
                resolve(recordsGraphs);
              };
            });
          } else {
            resolve(recordsGraphs);
          }
        });
      });
  }

  getRecordsChartsWeek(mark: string, currentUser: User): any{

      let from = new Date();
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setMilliseconds(0);
      from.setDate(from.getDate() - 7);
      let recordsGraphs = [];
      
      for (let i = 0; i < 8; i++) {
        const put = {
          key: moment(from).add(i, 'days').format('dddd'),
          day: from.getDate() + i,
          total: 0
        };
        recordsGraphs.push(put);
      }
      let a;
      return a = new Promise((resolve, reject) => {
        resolve(chartsDAO.getGraphs(mark, from, currentUser));
      }).then((recordsAll: Array<any>) => {
        let a;
        return a = new Promise((resolve, reject) => {
          if (recordsAll.length > 0) {
            recordsAll.forEach((recordOne: any, key, arr) => {
              const dateRecord = new Date(recordOne.fecha);
              const day = dateRecord.getDate();
              //var dias = new Array('domingo','lunes','martes','miercoles','juev es','viernes','sabado');
              //const day = dias[dateRecord.getDay()];

              recordsGraphs[recordsGraphs.findIndex((rec) => rec.day === day)].total++;
              if (Object.is(arr.length - 1, key)) {
                resolve(recordsGraphs);
              };
            });
          } else {
            resolve(recordsGraphs);
          }
        });
      });
  }

  getRecordsChartsMonth(mark: string, currentUser: User): any{

      let from = new Date();
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setMilliseconds(0);
      let recordsGraphs = [];
      for (let i = 0; i < from.getDate()+1; i++) {
        const put = {
          key: i+1,
          total: 0
        };
        recordsGraphs.push(put);
      }
      const newFrom = from.setDate(1);
      let a;
      return a = new Promise((resolve, reject) => {
        resolve(chartsDAO.getGraphs(mark, newFrom, currentUser));
      }).then((recordsAll: Array<any>) => {
        let a;
        return a = new Promise((resolve, reject) => {
          if (recordsAll.length > 0) {
            recordsAll.forEach((recordOne: any, key, arr) => {
              const dateRecord = new Date(recordOne.fecha);
              const day = dateRecord.getDate();
              recordsGraphs[recordsGraphs.findIndex((rec) => rec.key === day)].total++;
              if (Object.is(arr.length - 1, key)) {
                resolve(recordsGraphs);
              };
            });
          } else {
            resolve(recordsGraphs);
          }
        });
      });
  }
}
