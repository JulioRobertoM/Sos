import { SOSComponent } from './sos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { UserComponent } from 'src/app/modules/sos/views/settings/views/users/user/user.component';
import { UsersResolver } from 'src/app/modules/sos/views/settings/views/users/users.resolver';
import { CanActivateUserGuard } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-user-guard.service';
import { CanDeactivateUserGuard } from 'src/app/modules/sos/views/settings/views/users/user/auth-guards/can-deactivate/can-deactivate-paciente-guard.service';
import { UserResolver } from 'src/app/modules/sos/views/settings/views/users/user/user.resolver';
import { CanActivateTemplateGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-template-guard.service";
import { CanActivateInspectionsGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-inspections-guard.service";
import { CanActivateWorOrderGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-worOrder-guard.service";
import { CanActivateAircraftGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-aircraft-guard.service";
import { CanActivateSettingsGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-settings-guard.service";
import { CanActivateGeneralSettingsGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-generalSettings-guard.service";
import { CanActivateFullSettingsGuardService } from "src/app/modules/sos/views/settings/views/users/user/auth-guards/can-activate/can-activate-fullSettings-guard.service";
import { CuerpoComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/pedido/cuerpoped/cuerpoped.component';
import { PedidosComponent } from 'src/app/modules/sos/views/pedidos/pedidos.component';
import { PedidoComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/pedido/pedido.component';
import { FormPedidosComponent } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.component';
import { FormPedidosResolver } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.resolver';
import { ReferenciasComponent } from 'src/app/modules/sos/views/referencias/referencias.component';
import { ReferenciaComponent } from 'src/app/modules/sos/views/referencias/referencia/referencia.component';
import { ReferenciasResolver } from 'src/app/modules/sos/views/referencias/referencia/referencia.resolver';
import { CarteraComponent } from 'src/app/modules/sos/views/cartera/cartera.component';
import { AuxCarteraComponent } from 'src/app/modules/sos/views/auxcartera/auxcartera.component';
import { SettingsComponent } from 'src/app/modules/sos/views/settings/settings.component';
import { RolesComponent } from 'src/app/modules/sos/views/settings/views/roles/roles.component';
import { RolComponent } from 'src/app/modules/sos/views/settings/views/roles/rol/rol.component';
import { RolResolver } from 'src/app/modules/sos/views/settings/views/roles/rol/rol-resolver.service';
import { GeneralsComponent } from 'src/app/modules/sos/views/settings/views/generals/generals.component';
import { GeneralResolver } from 'src/app/modules/sos/views/settings/views/generals/generals-resolver.service';
import { KardexComponent } from 'src/app/modules/sos/views/kardex/kardex.component';
import { AyudaComponent } from 'src/app/modules/sos/views/ayuda/ayuda.component';
import { UsersComponent } from 'src/app/modules/sos/views/settings/views/users/users.component';
import { CanActivatePedidosService } from 'src/app/auth-guard/can-activate-pedidos.service';
import { CanActivateCarteraService } from 'src/app/auth-guard/can-activate-cartera.service';
import { CanActivateConfigService } from 'src/app/auth-guard/can-activate-config.service';
import { CanActivateGeneralService } from 'src/app/auth-guard/can-activate-general.service';
import { CanActivateAuxCarteraService } from 'src/app/auth-guard/can-activate-auxcartera.service';
import { CanActivateReferenciaService } from 'src/app/auth-guard/can-activate-referencia.service';
import { CanActivateRolUsuarioService } from 'src/app/auth-guard/can-activate-rolusuario.service';
import { CanActivateUsuarioService } from 'src/app/auth-guard/can-activate-usuario.service';
import { TabletComponent } from 'src/app/modules/sos/views/tablet/tablet.component';

const routes: Routes = [
  { path: '', component: SOSComponent, 
    children: [

      { path: '', component: HomeComponent },

      //USERS
      
      { path: 'pedidos',
        component: PedidosComponent,
        canActivate: [CanActivatePedidosService],
        pathMatch: 'full' 
      },
      {
        path: 'pedidos/:id',
        component: FormPedidosComponent,
        canActivate: [CanActivatePedidosService],
        resolve: {
          data: FormPedidosResolver
        }
      },
      { path: 'referencias',
        component: ReferenciasComponent,
        canActivate: [CanActivateReferenciaService],
        pathMatch: 'full' 
      },
      {
        path: 'referencias/:id',
        component: ReferenciaComponent,
        canActivate: [CanActivateReferenciaService],
        resolve: {
          data: ReferenciasResolver
        }
      },
      { path: 'cartera',
        component: CarteraComponent,
        canActivate: [CanActivateCarteraService],
        pathMatch: 'full' 
      },
      { path: 'ayuda',
        component: AyudaComponent,
        canActivate: [CanActivateUserGuard],
        pathMatch: 'full' 
      },
      { path: 'tablet',
        component: TabletComponent,
        canActivate: [CanActivateUserGuard],
        pathMatch: 'full' 
      },
      { path: 'auxcartera',
        component: AuxCarteraComponent,
        canActivate: [CanActivateAuxCarteraService],
        pathMatch: 'full' 
      },
      { path: 'kardex',
        component: KardexComponent,
        canActivate: [CanActivateUserGuard],
        pathMatch: 'full' 
      },
      { path: 'settings', 
        component: SettingsComponent,
        canActivate: [CanActivateConfigService],

        children:[
          //{ path: '', redirectTo: 'generals' },
          { path: 'generals', component: GeneralsComponent,
          canActivate: [CanActivateGeneralService],
            resolve: {
              data: GeneralResolver
            }
          }, 
          { path: 'roles', component: RolesComponent,
            canActivate: [CanActivateRolUsuarioService],
            pathMatch: 'full' 
          }, 
          { path: 'roles/:id',
            component: RolComponent,
            canActivate: [CanActivateRolUsuarioService],
            resolve: {
              data: RolResolver
            }
          },
          { path: 'users',
            component: UsersComponent,
            canActivate: [CanActivateUsuarioService],
            resolve: {
              data: UsersResolver
            },
            pathMatch: 'full' 
          },
          {
            path: 'users/:id',
            component: UserComponent,
            canActivate: [CanActivateUsuarioService],
            resolve: {
              data: UserResolver
            }
          },
          /*{ path: 'baseconos',
            component: BaseconosComponent,
            canActivate: [CanActivateUserGuard],
            /*resolve: {
              data: BaseconoResolver
            },
            pathMatch: 'full' 
          },*/
          /*{
            path: 'baseconos/:id',
            component: BaseconoComponent,
            canActivate: [CanActivateUserGuard],
            resolve: {
              data: UserResolver
            }
          },*/
        ]
      }
      /*{ path: 'settings',
        data: { state: 'Settings', preload: true },
        loadChildren: './views/settings/settings.module#SettingsModule'
      },*/
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []  
})
export class SOSRoutingModule { }
