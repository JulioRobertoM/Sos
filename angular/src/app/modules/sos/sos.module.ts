import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SOSComponent } from './sos.component';
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
import { MdInputComponent } from './shared/components/md-input/md-input.component';
import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { InterceptorService } from './shared/interceptors/interceptor/interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { SafeHtmlPipe } from './shared/pipes/safe-html/safe-html.pipe';

import { MyNavComponent } from './shared/components/my-nav/my-nav.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CustomQuillComponent } from './shared/components/custom-quill/custom-quill.component';
import { HomeComponent } from './views/home/home.component';
import { UserService } from './shared/services/user/user.service';
import { UTILSService } from './shared/services/utils/utils.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SOSRoutingModule } from './sos-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { ErrorAlertDialogComponent } from './shared/components/error-alert-dialog/error-alert-dialog.component';
import { DeleteDialogComponent } from './shared/components/delete-dialog/delete-dialog.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { SortByOrderPipe } from './shared/pipes/sort-by-order/sort-by-order';
import { SOSService } from './shared/services/sos/sos.service';
import { SearchByComponent } from './shared/components/search-by/search-by.component';
import { GlobalService} from "./shared/services/global/global.service";
import { PedidoComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/pedido/pedido.component';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';
import { ClienteService } from 'src/app/modules/sos/shared/services/clientes/clientes.service';
import { TablaprecioService } from 'src/app/modules/sos/shared/services/tablaprecios/tablaprecios.service';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';
import { CuerpoComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/pedido/cuerpoped/cuerpoped.component';
import { PedidosComponent } from 'src/app/modules/sos/views/pedidos/pedidos.component';
import { FormPedidosComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.component';
import { FormPedidosResolver } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.resolver';
import { PreciosService } from 'src/app/modules/sos/shared/services/precios/precios.service';
import { BuscarPrecioComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/pedido/cuerpoped/buscar-precio/buscar-precio.component';
import { UpdateDialogComponent } from 'src/app/modules/sos/shared/components/update-dialog/update-dialog.component';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';
import { ReferenciasComponent } from 'src/app/modules/sos/views/referencias/referencias.component';
import { ReferenciaComponent } from 'src/app/modules/sos/views/referencias/referencia/referencia.component';
import { ReferenciasResolver } from 'src/app/modules/sos/views/referencias/referencia/referencia.resolver';
import { BuscarReferComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/pedido/cuerpoped/buscar-referencia/buscar-referencia.component';
import { CarteraComponent } from 'src/app/modules/sos/views/cartera/cartera.component';
import { CarteraService } from 'src/app/modules/sos/shared/services/cartera/cartera.service';
import { AuxCarteraComponent } from 'src/app/modules/sos/views/auxcartera/auxcartera.component';
import { RoleMenuService } from 'src/app/modules/sos/shared/services/rolemenu/rolemenu.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChartHomeComponent } from 'src/app/modules/sos/views/home/chart/chart.component';
import { ChartsService } from 'src/app/modules/sos/shared/services/charts/charts.service';
import { ChartsModule } from 'ng2-charts';
import { SettingsComponent } from 'src/app/modules/sos/views/settings/settings.component';
import { GeneralsComponent } from 'src/app/modules/sos/views/settings/views/generals/generals.component';
import { RolComponent } from 'src/app/modules/sos/views/settings/views/roles/rol/rol.component';
import { RolesComponent } from 'src/app/modules/sos/views/settings/views/roles/roles.component';
import { RolResolver } from 'src/app/modules/sos/views/settings/views/roles/rol/rol-resolver.service';
import { RolService } from 'src/app/modules/sos/shared/services/rol/rol.service';
import { GeneralResolver } from 'src/app/modules/sos/views/settings/views/generals/generals-resolver.service';
import { KardexComponent } from 'src/app/modules/sos/views/kardex/kardex.component';
import { KardexService } from 'src/app/modules/sos/shared/services/kardex/kardex.service';
import { AyudaComponent } from 'src/app/modules/sos/views/ayuda/ayuda.component';
import { UsersComponent } from 'src/app/modules/sos/views/settings/views/users/users.component';
import { UserComponent } from 'src/app/modules/sos/views/settings/views/users/user/user.component';
import { UsersResolver } from 'src/app/modules/sos/views/settings/views/users/users.resolver';
import { UserResolver } from 'src/app/modules/sos/views/settings/views/users/user/user.resolver';
import { CanActivateUserGuard } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-user-guard.service';
import { CanDeactivateUserGuard } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-deactivate/can-deactivate-paciente-guard.service';
import { ChangePasswordDialogComponent } from 'src/app/modules/sos/views/settings/views/users/user/change-password/change-password.component';
import { CanActivateTemplateGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-template-guard.service';
import { CanActivateInspectionsGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-inspections-guard.service';
import { CanActivateAircraftGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-aircraft-guard.service';
import { CanActivateWorOrderGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-worOrder-guard.service';
import { CanActivateSettingsGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-settings-guard.service';
import { CanActivateGeneralSettingsGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-generalSettings-guard.service';
import { CanActivateFullSettingsGuardService } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-fullSettings-guard.service';
import { CanActivatePedidosService } from 'src/app/auth-guard/can-activate-pedidos.service';
import { CanActivateCarteraService } from 'src/app/auth-guard/can-activate-cartera.service';
import { CanActivateConfigService } from 'src/app/auth-guard/can-activate-config.service';
import { CanActivateGeneralService } from 'src/app/auth-guard/can-activate-general.service';
import { CanActivateAuxCarteraService } from 'src/app/auth-guard/can-activate-auxcartera.service';
import { CanActivateReferenciaService } from 'src/app/auth-guard/can-activate-referencia.service';
import { CanActivateUsuarioService } from 'src/app/auth-guard/can-activate-usuario.service';
import { CanActivateRolUsuarioService } from 'src/app/auth-guard/can-activate-rolusuario.service';
import { TabletComponent } from 'src/app/modules/sos/views/tablet/tablet.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'DD MMM YYYY',
    monthYearA11yLabel: 'DD MMM YYYY',
  },
};

@NgModule({
  entryComponents: [
    AlertDialogComponent,
    ErrorAlertDialogComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    ChangePasswordDialogComponent,
    BuscarPrecioComponent,
    BuscarReferComponent,
  ],
  declarations: [
    AlertDialogComponent,
    ErrorAlertDialogComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    ChangePasswordDialogComponent,
    SOSComponent,
    NavbarComponent,
    MdInputComponent,
    SafeHtmlPipe,
    SortByOrderPipe,
    MyNavComponent,
    CustomQuillComponent,
    HomeComponent,
    UsersComponent,
    UserComponent,
    PedidosComponent,
    PedidoComponent,
    CuerpoComponent,
    SearchByComponent,
    BuscarPrecioComponent,
    BuscarReferComponent,
    FormPedidosComponent,
    ReferenciasComponent,
    ReferenciaComponent,
    CarteraComponent,
    AuxCarteraComponent,
    ChartHomeComponent,
    SOSComponent,
    SettingsComponent,
    GeneralsComponent,
    RolComponent,
    RolesComponent,
    KardexComponent,
    AyudaComponent,
    TabletComponent,
  ],
  imports: [
    // SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
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
    SOSRoutingModule,
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
    QuillModule,
    LayoutModule,
    CdkTableModule,
    InfiniteScrollModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    ChartsModule,
    // NgProgressModule
    // BrowserAnimationsModule,
    CdkTableModule,
    MatTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    GlobalService,
    UTILSService,
    UserService,
    CookieService,
    SOSService,
    PedidoService,
    ClienteService,
    TablaprecioService,
    ReferenciaService,
    PreciosService,
    ReferenciasResolver,
    CarteraService,
    RoleMenuService,
    ChartsService,
    //RESOLVERS
    UsersResolver,
    UserResolver,
    FormPedidosResolver,
    RolResolver,
    RolService,
    GeneralResolver,
    KardexService,
    //GUARDS
    CanActivatePedidosService,
    CanActivateCarteraService,
    CanActivateConfigService,
    CanActivateGeneralService,
    CanActivateAuxCarteraService,
    CanActivateReferenciaService,
    CanActivateRolUsuarioService,
    CanActivateUsuarioService,
    CanActivateUserGuard,
    CanActivateTemplateGuardService,
    CanActivateInspectionsGuardService,
    CanActivateWorOrderGuardService,
    CanActivateAircraftGuardService,
    CanActivateSettingsGuardService,
    CanActivateGeneralSettingsGuardService,
    CanActivateFullSettingsGuardService,
    CanDeactivateUserGuard,
    { provide: 'CanActivateUserGuard', useValue: () => {return true;} },
    { provide: 'CanDeactivateUserGuard', useValue: () => {return true;} },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    
  ],
  bootstrap: [SOSComponent]
})
export class SOSModule { }
