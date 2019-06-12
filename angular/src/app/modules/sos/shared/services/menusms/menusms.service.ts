import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Menu } from "../../models/menu";
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu: Menu;

  private URL = this.globalService.serverURI + "/ge_menu";
  
  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getMenu(codigo: string){
    return this.http.get<any>(`${this.URL}/getMenu/${codigo}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  getMenux(): Promise<any>{
    debugger;
    return new Promise((resolve, reject) => {
      if(this.menu){
        resolve(this.menu);
      }
      else {
        this.http.get<any>(`${this.URL}/menu`).subscribe(
          menu => {
            this.menu = menu;
            resolve(this.menu);
          }
        );
      }
    });
  }

  getAll(){
    return this.http.get<any>(`${this.URL}/getAll`, {})
        .pipe(
          catchError(() => of([]))
        );
  }
}
