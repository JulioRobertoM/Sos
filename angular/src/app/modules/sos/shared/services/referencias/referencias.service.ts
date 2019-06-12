import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Referencias } from '../../models/Referencias';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ReferenciaService {

  private URL = this.globalService.serverURI + "/referencias";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  save(producto : Referencias): Observable<Referencias> {
    return this.http.post<Referencias>(this.URL + "/", producto);
  }

  delete(id: number){
    return this.http.delete<Referencias>(`${this.URL}/${id}`);
  }

  getById(id: number){
    return this.http.get<any>(`${this.URL}/getById/${id}`);
  }

  getAll(){
    return this.http.post<any>(`${this.URL}/getAll`, {});
  }

}
