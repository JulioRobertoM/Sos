import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { RoleMenu } from '../../models/RoleMenu';

@Injectable()
export class RoleMenuService {

  private URL = this.globalService.serverURI + "/rolmenu";

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getAll(idrole: number){
    return this.http.get<any>(`${this.URL}/getAll/${idrole}`, {})
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

  save(rol: RoleMenu): Observable<RoleMenu> {
    return this.http.post<RoleMenu>(`${this.URL}/`, rol);
  }

  delete(idrole: number){
    return this.http.delete<RoleMenu>(`${this.URL}/${idrole}`);
  } 

  getMenu(idrole: number,codigo: string){
    return this.http.get<any>(`${this.URL}/getMenu/${idrole}/${codigo}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  getRolMenu(idrole: number){
    return this.http.get<any>(`${this.URL}/getRolMenu/${idrole}`);
  }
}