import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootCanActivateViaAuthGuard } from './auth-guard/root-can-activate-via-auth-guard/root-can-activate-via-auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginCanActivateViaAuthGuard } from './auth-guard/login-can-activate-via-auth-guard/login-can-activate-via-auth-guard.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { InterceptorService } from './modules/sos/shared/interceptors/interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    LoginCanActivateViaAuthGuard,
    RootCanActivateViaAuthGuard,
    {provide: 'RootCanActivateViaAuthGuard', useClass: RootCanActivateViaAuthGuard},
    {provide: 'LoginCanActivateViaAuthGuard', useClass: LoginCanActivateViaAuthGuard},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/