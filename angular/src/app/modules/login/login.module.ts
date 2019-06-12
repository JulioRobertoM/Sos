import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalService } from "../sos/shared/services/global/global.service";

@NgModule({
  entryComponents: [
    DialogAlertComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,    
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    HttpClientModule,
    HttpModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  declarations: [
    DialogAlertComponent,
    PageLoginComponent
  ],
  providers: [
    GlobalService
  ]
})
export class LoginModule { }
