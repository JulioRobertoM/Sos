import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RootCanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if(localStorage.getItem('arcs.sessionToken')){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}