import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../../../../shared/models/User';
import { GlobalService } from '../../../../../shared/services/global/global.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserResolver implements Resolve<any>
{
    routeParams: any;
    user: User;
    // onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});

    // paises : Array<Pais> = [];
    // tiposDoc : Array<TipoDoc> = [];
    // estadosCiviles : Array<EstadoCivil> = [];
    // tiposUsuario : Array<TipoUsuario> = [];
    // planesEPS : Array<PlanEPS> = [];
    // epss : Array<EPS> = [];
    // sedes : Array<Sede> = [];
    // ciudades : Array<Ciudad> = [];
    // tiposAfiliado : Array<TipoAfiliado> = [];
    // ocupaciones : Array<Ocupacion> = [];

    private URL = this.globalService.serverURI + "/users";

    constructor(private http: HttpClient,
                private globalService: GlobalService){}

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

      this.routeParams = route.params;

      return new Promise((resolve, reject) => {

        Promise.all([
          this.getUser(),
          //this.getUserRoles(),
          //this.getCompanies(),
          // this.getDocTypes()
          // this.getTiposDoc(),
          // this.getPlanEPS(),
          // this.getSedes(),
          // this.getTiposAfiliado(),
          // this.getTiposUsuario(),
          // this.getEstadosCiviles(),
          // this.getTiposDoc(),
          // this.getPaises(),
          // this.getEPS(),
          // this.getCiudades(),
          // this.getOcupaciones()
        ]).then(
          () => {
            resolve();
          },
          reject
        );
      });
    }

    getUser(): Promise<any>{
      return new Promise((resolve, reject) => {
        if ( this.routeParams.id === 'new' ){
          this.user = new User();
          // this.onUserChanged.next(new User());
          resolve(false);
        }
        else {
          this.http.get(`${this.URL}/getById/${this.routeParams.id}`)
            .subscribe((user: User) => {
              this.user = user;
              // this.onUserChanged.next(this.user);
              resolve(user);
            }, reject);
        }
      });
    }

    saveUser(user){
      return new Promise((resolve, reject) => {
        this.http.post(`${this.URL}`, user)
            .subscribe((response: any) => {
              resolve(response);
            }, reject);
      });
    }

    addUser(user){
      return new Promise((resolve, reject) => {
        this.http.post(`${this.URL}/`, user)
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    }

    /*getUserRoles(){
      return new Promise((resolve, reject) => {
        //CACHÉ
        // if(this.roles.length > 0){
        //   resolve(this.roles);
        // }
        this.tablasAuxService.getAll('UserRole')
          .subscribe((userRoles: Array<UserRole>) => {
            this.userRoles = userRoles;
            resolve(userRoles)
          }, reject)
      });
    }

    getCompanies(){
      return new Promise((resolve, reject) => {
        this.companyService.getAll()
          .subscribe((companies: Array<Company>) => {
            this.companies = companies;
            resolve(companies)
          }, reject)
      });
    }*/

}