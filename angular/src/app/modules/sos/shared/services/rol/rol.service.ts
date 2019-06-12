import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { Rol } from '../../models/Rol';

@Injectable()
export class RolService {

  private URL = this.globalService.serverURI + "/rol";

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getAll(){
    return this.http.get<any>(`${this.URL}/getAll`, {})
        .pipe(
          catchError(() => of([]))
        );
  }

  getById(id: number){
    return this.http.get<any>(`${this.URL}/getById/${id}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  save(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.URL}/`, rol);
  }

  delete(id: number){
    return this.http.delete<Rol>(`${this.URL}/delete/${id}`);
  } 
/*
  insertarMenu(idrole : number, codigo: string){
    debugger;
    return this.http.post(`${this.URL}/`, {"idrole":idrole,"codigo":codigo});
  }  */
  /*borrar(idrole: number){
    debugger;
    return this.http.delete<any>(`${this.URL}/${idrole}`);
  } */ 

}