import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Clientes } from '../../models/Clientes';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private URL = this.globalService.serverURI + "/clientes";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  save(cliente : Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.URL + "/", cliente);
  }

  delete(id: number){
    return this.http.delete<Clientes>(`${this.URL}/${id}`);
  }
  
  getById(id: number): Observable<Clientes>{
    return this.http.get<any>(`${this.URL}/getById/${id}`);
  }

  getAll(){
    return this.http.post<any>(`${this.globalService.serverURI}/clientes/getAll`, {});
  }

}
