import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { SOS } from 'src/app/modules/sos/shared/models/SOS';
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';

@Injectable()
export class GeneralResolver implements Resolve<SOS> {

  routeParams: Params;
  SOS: SOS;

  constructor(private globalService: GlobalService, 
              private sosService: SOSService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCurrentSOS()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    })
  }

  getCurrentSOS(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.sosService.get(1).subscribe(
        (sos: SOS) => {
          this.SOS = sos;
          resolve(sos);
        }
      );
    });
  }
}