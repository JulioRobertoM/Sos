import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  //https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
    const sessionToken = localStorage.getItem("arcs.sessionToken");

    if(sessionToken){
      const cloned = req.clone({
        headers: req.headers.set("Authorization", sessionToken)
      });
      return next.handle(cloned).pipe(
        this.customTap('IF')
      )
    }
    else {
      return next.handle(req).pipe(
        this.customTap('ELSE')
      )
    }
  }

  private customTap(comingFrom : string){

    return tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log("HttpErrorResponse - err.status", err.status);
        if (err.status === 401) {
          // redirect to the login route
          this.router.navigate(['/login']);
          // or show a modal
        }
      }
    })

  }

}
