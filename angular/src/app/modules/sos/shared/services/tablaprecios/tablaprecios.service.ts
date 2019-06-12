import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Tablaprecios } from '../../models/Tablaprecios';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class TablaprecioService {

  private URL = this.globalService.serverURI + "/tablaprecios";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  save(cliente : Tablaprecios): Observable<Tablaprecios> {
    return this.http.post<Tablaprecios>(this.URL + "/", cliente);
  }

  delete(id: number){
    return this.http.delete<Tablaprecios>(`${this.URL}/${id}`);
  }

  getById(id: number){
    return this.http.get<any>(`${this.URL}/getById/${id}`);
  }

  getAll(){
    return this.http.post<any>(`${this.URL}/getAll`, {});
  }

}
