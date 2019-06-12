import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule,
  MatTableModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatInputModule, MatDialogModule,
  MatGridListModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,
  MatChipsModule, MatTooltipModule, MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule, MatMenuModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatListModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatTreeModule } from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule} from "@angular/material-moment-adapter";
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { NO_ERRORS_SCHEMA} from "@angular/core";
import { InterceptorService } from 'src/app/modules/sos/shared/interceptors/interceptor/interceptor.service';
import { SettingsComponent } from 'src/app/modules/sos/views/settings/settings.component';
import { RolComponent } from 'src/app/modules/sos/views/settings/views/roles/rol/rol.component';
import { RolesComponent } from 'src/app/modules/sos/views/settings/views/roles/roles.component';
import { GeneralResolver } from 'src/app/modules/sos/views/settings/views/generals/generals-resolver.service';
import { RolResolver } from 'src/app/modules/sos/views/settings/views/roles/rol/rol-resolver.service';
import { RolService } from 'src/app/modules/sos/shared/services/rol/rol.service';
import { UsersComponent } from 'src/app/modules/sos/views/settings/views/users/users.component';
import { UserComponent } from 'src/app/modules/sos/views/settings/views/users/user/user.component';
import { UserResolver } from 'src/app/modules/sos/views/settings/views/users/user/user.resolver';
import { UserService } from 'src/app/modules/sos/shared/services/user/user.service';
import { UsersResolver } from 'src/app/modules/sos/views/settings/views/users/users.resolver';

@NgModule({
  entryComponents: [
    SettingsComponent,
    RolComponent,
    RolesComponent,
    UsersComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatMenuModule,
    MatRadioModule,
    MatTreeModule,
    NgProgressModule,
    NgProgressHttpModule,
  ],
  declarations: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    GeneralResolver,
    RolResolver,
    RolService,
    UserResolver,
    UserService,
    UsersResolver,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class SettingsModule {}
