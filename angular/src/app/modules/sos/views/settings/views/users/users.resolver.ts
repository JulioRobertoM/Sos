import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../../../shared/services/user/user.service';
import { GlobalService } from '../../../../shared/services/global/global.service';

@Injectable()
export class UsersResolver implements Resolve<any>{

    private URL = this.globalService.serverURI + "/users";

    users: Array<User> = [];
    totalRows: number = 0;
    offset: number = 0;
    stepOffset: number = 20;
    onUsuariosChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient, 
                private userService: UserService, 
                private globalService: GlobalService){ }

    resetValues(){
      this.users = [];
      this.offset = 0;
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      this.resetValues();
      return new Promise((resolve, reject) => {
        Promise.all([
          // this.getUsers({limit: 10, offset: 0}),
          this.getTotalRows()
        ]).then(
          () => resolve(),
          reject
        );
      });
    }

    getTotalRows(){
      return new Promise((resolve, reject) => {
        this.totalRows = 5;
        return resolve(this.totalRows);
      });

    }

    getUsers({limit, offset}): Promise<any> {
      return new Promise((resolve, reject) => {
        // this.userService.getAll({limit: 1000, offset: 0})
        //     .subscribe((users: Array<User>) => {
        //   users.map((user)=>{
        //     this.users.push(user);
        //   });
        //   this.onUsuariosChanged.next(this.users);
        //   resolve(this.users);
        // }, reject);
        resolve();
      });
    }

}
