/**
 * Created by asus on 22/01/2019.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';

@Injectable()
export class ReferenciasResolver implements Resolve<any>
{
  routeParams: any;
  referencia: Referencias;

  constructor(private referenciaService: ReferenciaService){}

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
        this.getPedido()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getPedido(): Promise<any>{
    return new Promise((resolve, reject) => {
      //debugger;
      if ( this.routeParams.id === 'new' ){
        this.referencia = new Referencias();
        resolve(false);
      }
      else {
        this.referenciaService.getById(this.routeParams.id)
          .subscribe((RsoGet: Referencias) => {
            this.referencia = RsoGet;
            resolve(RsoGet);
          }, reject);
      }
    });
  }

}
