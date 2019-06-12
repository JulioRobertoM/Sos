import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Clientes } from 'src/app/modules/sos/shared/models/Clientes';

@Injectable()
export class CarteraService {

  private URL = this.globalService.serverURI + "/cartera";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  getCartera(codcliente: string){
    return this.http.get<any>(`${this.URL}/getCartera/${codcliente}`);
  }

  getAuxCartera(fechaini: any, fechafin: any, codcliente: string){
    return this.http.get<any>(`${this.URL}/getAuxCartera/${fechaini}/${fechafin}/${codcliente}`);
  }

  getPrueba(codcliente: string){
    return this.http.get<any>(`${this.URL}/getPrueba/${codcliente}`);
  }
}
