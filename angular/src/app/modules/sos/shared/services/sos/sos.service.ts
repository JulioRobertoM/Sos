import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SOS } from '../../models/SOS';

@Injectable()
export class SOSService {

  private URL = this.globalService.serverURI + "/SOS";

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  get(id: number){
    return this.http.get<SOS>(`${this.URL}/get`);
  }

  getAll(){
    return this.http.get<SOS>(`${this.URL}/getAll`);
  }

  getById(id: number){
    return this.http.get<any>(`${this.URL}/getById/${id}`);
  }

  save(sos : SOS): Observable<SOS> {
    return this.http.post<SOS>(`${this.URL}/`, sos)
  }

  delete(id: number){
    return this.http.delete<SOS>(`${this.URL}/${id}`);
  }

}