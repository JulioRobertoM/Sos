import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootCanActivateViaAuthGuard } from './auth-guard/root-can-activate-via-auth-guard/root-can-activate-via-auth-guard.service';
import { LoginCanActivateViaAuthGuard } from './auth-guard/login-can-activate-via-auth-guard/login-can-activate-via-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [ 'LoginCanActivateViaAuthGuard', LoginCanActivateViaAuthGuard ]
  },
  {
    path: 'sos',
    loadChildren: './modules/sos/sos.module#SOSModule',
    canActivate: [ 'RootCanActivateViaAuthGuard', RootCanActivateViaAuthGuard ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/