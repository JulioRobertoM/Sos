import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Pedido } from '../../models/Pedidos';
import { tap, catchError, finalize } from 'rxjs/operators';
import { CuerpoPed } from '../../models/CuerpoPed';

@Injectable()
export class PedidoService {

  private URL = this.globalService.serverURI + "/pedidos";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  save(pedido : Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.URL + "/", pedido);
  }

  delete(id: number){
    return this.http.delete<Pedido>(`${this.URL}/delete/${id}`);
  }

  bloquear(id: number){
    return this.http.delete<Pedido>(`${this.URL}/bloquear/${id}`);
  }

  getById(id: number){
    return this.http.get<any>(`${this.URL}/getById/${id}`);
  }

  getAll(){
    return this.http.post<any>(`${this.URL}/getAll`, {});
  }

  deletecuerpo(id: number) {
    return this.http.delete<CuerpoPed>(`${this.URL}/deletecuerpo/${id}`);
  }

  savecuerpo(cuerpoped: CuerpoPed): Observable<CuerpoPed> {
    return this.http.post<CuerpoPed>(this.URL + '/savecuerpo', cuerpoped);
  }

  getAllcuerpo(id: number): Observable<Array<CuerpoPed>> {
    return this.http.get<Array<CuerpoPed>>(this.URL + '/getAllcuerpo/' + id);
  }

  getGraphs(){
    return this.http.post<any>(`${this.URL}/getGraphs`, {});
  }

}
