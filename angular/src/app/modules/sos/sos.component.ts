import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Keepalive } from '@ng-idle/keepalive';
import { Observable } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { timer, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { User } from './shared/models/User';
import { GlobalService } from './shared/services/global/global.service';
import { environment } from 'src/environments/environment';
import { UserService } from './shared/services/user/user.service';
import { MatDialog } from '@angular/material';
import { ChangePasswordDialogComponent } from 'src/app/modules/sos/views/settings/views/users/user/change-password/change-password.component';
import { RoleMenuService } from 'src/app/modules/sos/shared/services/rolemenu/rolemenu.service';

@Component({
  selector: 'sos-root',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.scss']
})
export class SOSComponent {

  user: User;

  isDevelopment: boolean = !environment.production;

  title = 'app';
  events = [];
  openedLeft: Boolean = false;
  openedRight: Boolean = false;

  options: FormGroup;
  subscriptionMedia: Subscription;
  isMobileView: boolean;
  openSidenav: boolean;
  menu001: boolean = false;
  menu002: boolean = false;
  menu003: boolean = false;
  menu004: boolean = false;
  menu005: boolean = false;
  menu006: boolean = false;
  menu007: boolean = false;
  menu008: boolean = false;
  menu009: boolean = false;

  currentURL = '';

  constructor(public globalService: GlobalService,
              private userService: UserService,
              private rolmenuService: RoleMenuService,
              private idle: Idle,
              private keepalive: Keepalive,
              private dialog: MatDialog,
              private router: Router,
              private media: ObservableMedia,
              fb: FormBuilder) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentURL = val.url;
      }
    });

    this.openedLeft = true;
    this.openedRight = false;

    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });

  }

  ngOnInit(): void {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
    this.canActivate();
    this.globalService.getUser().then(user => {
        this.user = user;
      }
    );
  }

  changePassword(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      disableClose: true,
      width: '380px',
      data: {
        user: this.user
      }
    });
  }
  
  closedStart() {
    this.openSidenav = false;
  }

  toggleForceOpen() {
    this.openSidenav = !this.openSidenav;
  }

  signOut() {
    this.globalService.deleteSession();
    this.router.navigate(['/login']);
  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.globalService.getUser().then(user => {
        this.user = user;
        console.log(this.user.rol.id);
        //Pedidos
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_001').subscribe(permiso => {
          if(permiso){
            this.menu001 = true;
            resolve(true);
          }
          else{
            this.menu001 = false;
            resolve(false);
          }
        });
        //Cartera
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_002').subscribe(permiso => {
          if(permiso){
            this.menu002 = true;
            resolve(true);
          }
          else{
            this.menu002 = false;
            resolve(false);
          }
        });
        //AuxCartera
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_003').subscribe(permiso => {
          if(permiso){
            this.menu003 = true;
            resolve(true);
          }
          else{
            this.menu003 = false;
            resolve(false);
          }
        });
        //Referencias
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_004').subscribe(permiso => {
          if(permiso){
            this.menu004 = true;
            resolve(true);
          }
          else{
            this.menu004 = false;
            resolve(false);
          }
        });
        //Existencias
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_005').subscribe(permiso => {
          if(permiso){
            this.menu005 = true;
            resolve(true);
          }
          else{
            this.menu005 = false;
            resolve(false);
          }
        });
        //Config
        this.rolmenuService.getMenu(this.user.rol.id,'SOS_006').subscribe(permiso => {
          if(permiso){
            this.menu006 = true;
            resolve(true);
          }
          else{
            this.menu006 = false;
            resolve(false);
          }
        });
      });
    });
  }

}
