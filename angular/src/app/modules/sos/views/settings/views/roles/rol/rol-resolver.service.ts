import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Rol } from 'src/app/modules/sos/shared/models/Rol';
import { RoleMenuService } from 'src/app/modules/sos/shared/services/rolemenu/rolemenu.service';
import { RolService } from 'src/app/modules/sos/shared/services/rol/rol.service';

@Injectable()
export class RolResolver implements Resolve<Rol> {

  routeParams: Params;
  rol: Rol;

  constructor(private rolService: RolService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {
      Promise.all([
        this.getRol(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    })

  }

  getRol(): Promise<Rol>{
    return new Promise((resolve, reject) => {
      if ( this.routeParams.id === 'new' ){
        this.rol = new Rol();
        resolve(this.rol);
      }
      else {
        if(this.rol){
          resolve(this.rol);
        }
        else {
          this.rolService.getById(this.routeParams.id)
          .subscribe((ubicacion: Rol) => {
            this.rol = ubicacion;
            resolve(this.rol);
          }, reject);
        }
      }
    });
  }

}