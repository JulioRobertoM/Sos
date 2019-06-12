import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { AuthService } from '../auth/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {

    return true;

    // logged in so return true
    // if (localStorage.getItem('arcs.sessionToken')) {
    //   console.log("canActivate - sessionToken", localStorage.getItem('arcs.sessionToken'));
    //   return true;
    // }

    // not logged in so redirect to login page
    // this.router.navigate(['/login']);
    // return false;
    
    // return this.authService.isLoggedIn();
  }
}