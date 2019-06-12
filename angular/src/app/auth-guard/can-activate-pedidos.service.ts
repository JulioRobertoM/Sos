import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material";
import { User } from 'src/app/modules/sos/shared/models/User';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { RoleMenuService } from 'src/app/modules/sos/shared/services/rolemenu/rolemenu.service';

@Injectable()
export class CanActivatePedidosService implements CanActivate{

  user: User;
  constructor(private rolmenuService: RoleMenuService,
              private router: Router,
              private UTILS: UTILSService,
              private globalService: GlobalService,
              private snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.globalService.getUser().then(user => {
        this.user = user;
        console.log(this.user.rol.id);
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_001').subscribe(permiso => {
          if(permiso){
            resolve(true);
          }
          else{
            this.UTILS.showMensajesSms('Señor Usuario.  No tiene permisos para ingresar a la opción de '+
              'Pedidos en línea.');
            this.router.navigate([`sos`]);
            resolve(false);
          }
        });
      });
    });
  }
}
