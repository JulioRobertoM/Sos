import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Precios } from '../../models/Precios';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class PreciosService {

  private URL = this.globalService.serverURI + "/precios";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  save(pedido : Precios): Observable<Precios> {
    return this.http.post<Precios>(this.URL + "/", pedido);
  }

  delete(id: number){
    return this.http.delete<Precios>(`${this.URL}/${id}`);
  }

  getById(idref: number,idtabla: number){
    return this.http.get<any>(`${this.URL}/getById/${idref}/${idtabla}`);
  }

  getPrecios(idtablaprecio: number){
    return this.http.get<any>(`${this.URL}/getPrecios/${idtablaprecio}`);
  }

  getAll(){
    return this.http.post<any>(`${this.URL}/getAll`, {});
  }

}
