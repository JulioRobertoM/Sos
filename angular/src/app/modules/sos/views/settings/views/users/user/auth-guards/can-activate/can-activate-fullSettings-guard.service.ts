import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataUsersService } from '../../../services/data-users.service';
import { UserService } from '../../../../../../../shared/services/user/user.service';
import {GlobalService} from "../../../../../../../shared/services/global/global.service";
import {MatSnackBar} from "@angular/material";
// import { DataPacienteService } from 'app/main/content/apps/pacientes/pacientes/services/data.service';
// import { PacienteService } from 'app/shared/services/pacientes/

@Injectable()
export class CanActivateFullSettingsGuardService implements CanActivate{

  user;

  constructor(private dataService: DataUsersService,
              private globalService: GlobalService,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // if(this.dataService.user){
    //   return true;
    // }
    // else {
    //   return new Promise((resolve, reject) => {
    //     this.userService.getUser(route.params.id)
    //       .subscribe(user => {
    //         if(user){
    //           this.dataService.user = user;
    //           resolve(true);
    //         }
    //         else{
    //           this.router.navigate(['/apps/users']);
    //           resolve(false);       
    //         }
    //       });
    //   });
    // }


    return new Promise((resolve, reject) => {
      this.globalService.getUser().then(user => {
        this.user = user;
        debugger;
        if (this.user.userRole.id === 2 || this.user.userRole.id === 5) {
          resolve(true);
        }
        else {

          this.snackBar.open("Not Privilegies", undefined, {
            duration: 2000,
          });


          this.router.navigate(['/sos/']);
          resolve(false);
        }
      });
    });

  }
}
