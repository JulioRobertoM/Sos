import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class KardexService {

  private URL = this.globalService.serverURI + "/kardex";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  getExistencias(fecha: any,codr: string){
    return this.http.get<any>(`${this.URL}/getExistencias/${fecha}/${codr}`);
  }

}
