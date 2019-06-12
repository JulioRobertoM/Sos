import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public serverURI = environment.apiURL + '/api';
  public isLoading = new BehaviorSubject(false);

  // public user = new Subject<User>();

  public user: User;
  // onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  startLoading(){
    this.isLoading.next(true);
  }

  stopLoading(){
    this.isLoading.next(false);
  }

  getUser(): Promise<any>{
    return new Promise((resolve, reject) => {
      if(this.user){
        resolve(this.user);
      }
      else {
        this.http.get<any>(`${this.serverURI}/users/getCurrentUser`).subscribe(
          user => {
            this.user = user;
            resolve(this.user);
          }
        );
      }
    });
  }

  public setSession({ sessionToken, sessionExpiresIn, sessionCreatedAt }){
    localStorage.setItem('arcs.sessionToken', sessionToken);
    // localStorage.setItem('arcs.sessionExpiresIn', sessionExpiresIn);
    localStorage.setItem('arcs.sessionCreatedAt', sessionCreatedAt);
    // localStorage.setItem('arcs.user', JSON.stringify(user));
  }

  public deleteSession(){
    this.user = undefined;
    localStorage.removeItem('arcs.sessionToken');
    // localStorage.removeItem('arcs.sessionExpiresIn');
    localStorage.removeItem('arcs.sessionCreatedAt');
    // localStorage.removeItem('arcs.user');    
  }

}
