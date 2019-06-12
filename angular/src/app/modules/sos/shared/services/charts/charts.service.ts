import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { Observable } from "rxjs/Rx";

// @ts-ignore
@Injectable()
export class ChartsService {

  private URL = this.globalService.serverURI + '/graphs';

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  get(mark: string, time: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/get/${mark}/${time}`);
  }

}
