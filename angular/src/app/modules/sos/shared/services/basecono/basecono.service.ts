import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { BaseCono } from 'src/app/modules/sos/shared/models/BaseCono';

@Injectable()
export class BaseconoService {

  private URL = this.globalService.serverURI + "/basecono";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  save(basecono : BaseCono): Observable<BaseCono> {
    return this.http.post<BaseCono>(this.URL + "/", basecono);
  }

  delete(id: number){
    return this.http.delete<BaseCono>(`${this.URL}/${id}`);
  }

  getById(id: number){
    return this.http.get<any>(`${this.URL}/getById/${id}`);
  }

  getAll(){
    return this.http.post<any>(`${this.URL}/getAll`, {});
  }

}
