import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { User } from '../../models/User';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class UserService {

  private URL = this.globalService.serverURI + "/users";

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  refreshSession(): Observable<any>{
    return this.http.get<any>(this.globalService.serverURI + "/users/refreshSession");
  }

  save(user : User): Observable<User> {
    return this.http.post<User>(this.URL + "/", user);
  }

  delete(id: number){
    return this.http.delete<User>(`${this.URL}/${id}`);
  }

  getCurrentUser(){
    return this.http.get<any>(`${this.globalService.serverURI}/users/getCurrentUser`);
  }

  getUser(id: number){
    return this.http.get<any>(`${this.globalService.serverURI}/users/getById/${id}`);
  }

  getAll(){
    return this.http.post<any>(`${this.globalService.serverURI}/users/getAll`, {});
  }

  getSession(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.URL + `/getSession`, { username, password });
  }

  useSession(): Observable<any> {
    return this.http.get<any>(this.URL + "/useSession");
  }

}
