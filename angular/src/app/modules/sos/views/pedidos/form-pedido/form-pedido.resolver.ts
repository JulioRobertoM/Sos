/**
 * Created by asus on 22/01/2019.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/modules/sos/shared/models/Pedidos';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';

@Injectable()
export class FormPedidosResolver implements Resolve<any>
{
  routeParams: any;
  pedido: Pedido;

  constructor(private pedidoService: PedidoService){}

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
        this.pedido = new Pedido();
        resolve(false);
      }
      else {
        this.pedidoService.getById(this.routeParams.id)
          .subscribe((RsoGet: Pedido) => {
            this.pedido = RsoGet;
            resolve(RsoGet);
          }, reject);
      }
    });
  }

}
