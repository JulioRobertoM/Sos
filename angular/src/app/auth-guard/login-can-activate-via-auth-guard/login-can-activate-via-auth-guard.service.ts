import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginCanActivateViaAuthGuard {

  constructor(private router: Router) {}

  canActivate() {
    if(localStorage.getItem('arcs.sessionToken')){
      this.router.navigate(['/sos']);
      return false;
    }
    else{
      return true;
    }
  }

}
