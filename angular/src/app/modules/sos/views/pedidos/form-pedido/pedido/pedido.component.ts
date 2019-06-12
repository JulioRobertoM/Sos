import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogData } from 'src/app/modules/sos/shared/components/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/modules/sos/shared/services/clientes/clientes.service';
import { TablaprecioService } from 'src/app/modules/sos/shared/services/tablaprecios/tablaprecios.service';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { User } from 'src/app/modules/sos/shared/models/User';
import { CuerpoPed } from 'src/app/modules/sos/shared/models/CuerpoPed';
import { Clientes } from 'src/app/modules/sos/shared/models/Clientes';
import { Tablaprecios } from 'src/app/modules/sos/shared/models/Tablaprecios';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';
import { Pedido } from 'src/app/modules/sos/shared/models/Pedidos';
import { FormPedidosResolver } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.resolver';
import { UpdateDialogData } from 'src/app/modules/sos/shared/components/update-dialog/update-dialog.component';
import { UsersResolver } from 'src/app/modules/sos/views/settings/views/users/users.resolver';

export interface PeriodicElement {
  file: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {file: 'COD123', date: '19/02/2018'},
  {file: 'COD456', date: '12/08/2018'},
  {file: 'COD789', date: '09/05/2018'},
  {file: 'COD999', date: '23/04/2018'}
];

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  animations: [
    trigger('banished', [
      state('yes', style({ opacity: 0.25})),
      state('no', style({ opacity: 1})),
      transition('yes <=> no', animate('0.2s 225ms ease-in'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ opacity: 0, height: '0px', minHeight: '0px', display: 'none' })),
      state('expanded', style({ opacity: 1, visibility: 'visible' })),
      transition('expanded => collapsed', animate('0.5s 1ms ease-out')),
      transition('collapsed => expanded', animate('1s 100ms ease-out')),
    ]),
  ],
})
export class PedidoComponent implements OnInit {

  @Input() idForm: number;
  @Input() rsoForm: Pedido;
  @Input() user: User;
  form: FormGroup;
  pedido: Pedido;
  cuerpo: CuerpoPed;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @Output()
  changeRSO: EventEmitter<Pedido> = new EventEmitter<Pedido>();

  showPassword: boolean = false;
  countryControl : FormControl;
  clientesRecords: Array<Clientes> = [];
  tablapreRecords: Array<Tablaprecios> = [];
  referenciaRecords: Array<Referencias> = [];

  constructor(private UTILS: UTILSService,
              private pedidoResolver: FormPedidosResolver,
              private pedidoService : PedidoService,
              private clienteService: ClienteService, 
              private tablapreService: TablaprecioService,
              private referenciaService: ReferenciaService,
              private sosService: SOSService,
              private sosUser: UsersResolver,
              private router : Router,
              private snackBar: MatSnackBar) {

    this.pedido = this.pedidoResolver.pedido ? this.pedidoResolver.pedido : new Pedido();
    //this.user = this.sosUser.getUsers();  

    if(!this.pedido.id){
      this.showPassword = true;
    }

    this.getClientes();
    this.getTablaprecios();
    this.getReferencias();
    this.createForm();
    
    //this.pedido.idusuario = this.user.id;

    if (!this.pedido.id){
      const hora = new Date();
      const horaActual = hora.getHours()+':'+hora.getMinutes()+':'+hora.getSeconds();
      this.form.get('hora').setValue(horaActual);
      this.form.get('estado').setValue('0');
      const today = new Date().toISOString().split('T')[0];
      this.form.get('fecha').setValue(today);
      this.sosService.get(1).subscribe(
        (datos)=>{
          this.form.get('tm').setValue(datos.tm);
          this.form.get('prefijo').setValue(datos.prefijo);
          this.form.get('documento').setValue(datos.consecutivo.toString().padStart(8,"0"));
        });
    }  
  }

  ngOnInit() {
  }

  createForm() {
    this.form = new FormGroup({
      'tm': new FormControl({value: this.pedido.tm, disabled: true}, [
        Validators.required,
      ]),
      'prefijo': new FormControl({value: this.pedido.prefijo, disabled: true}, [
        Validators.required,
      ]),
      'documento': new FormControl({value: this.pedido.documento, disabled: true}, [
        Validators.required,
      ]),
      'fecha': new FormControl({value: this.pedido.fecha, disabled: this.isDisabled()}, [
        Validators.required,
      ]),
      'hora': new FormControl({value: this.pedido.hora, disabled: true}, [
      ]),
      'cliente': new FormControl({value: this.pedido.cliente, disabled: this.isDisabled()}, [
        Validators.required,
      ]),
      'tablaprecio': new FormControl({value: this.pedido.tablaprecio, disabled: this.isDisabled()}, [
        Validators.required,
      ]),
      'usuario': new FormControl({value: this.pedido.usuario, disabled: this.isDisabled()}, [
      ]),
      'estado': new FormControl({value: this.pedido.estado, disabled: this.isDisabled()}, [
      ]),
    },
    );
  }

  isDisabled(): Boolean {
    if (this.pedido.id > 0) {
      return true;
    } else {
      return false;
    }
  }

  isAgrega(): Boolean {
    if (this.pedido.id > 0) {
      return false;
    } else {
      return true;
    }
  }

  getAllcuerpo() {
    this.pedidoService.getAllcuerpo(this.idForm).subscribe(
      listRecords => {
        //this.dataSource = listRecords;
      }
    );
  }

  save(){
    console.log(this.form.getRawValue());
    if(this.form.valid) {
      const updatedUser = this.UTILS.updateEntity(this.pedido, this.form.getRawValue());
      this.pedidoService.save(updatedUser).toPromise()
        .then(
          (pedido: Pedido)=>{
            this.rsoForm = pedido;
            this.pedido = pedido;
            this.snackBar.open("Pedido grabado. Nro."+this.pedido.prefijo+" "+this.pedido.documento, undefined, {
              duration: 2000,
            });
            //this.router.navigate([`sos/pedidos/${pedido.id}`]);
            this.router.navigate([`sos/pedidos`]);
          },
          (error: HttpErrorResponse)=>{
            this.UTILS.showErrDialog(error);
          }
      );
    }
    else {
      this.UTILS.showIncompleteFormDialog();
    }
  }

  delete(){
    this.UTILS.showDeletePrompt(new DeleteDialogData('pedido'))
      .then(
        (shallDelete) => {
          if(shallDelete){
            this.pedidoService.delete(this.pedido.id).toPromise()
            .then(
              (pedido: Pedido)=>{
                this.snackBar.open("Pedido anulado", undefined, {
                  duration: 2000,
                });
                this.router.navigate([`sos/pedidos`]);
              },
              (error: HttpErrorResponse)=>{
                console.error(error);
                this.UTILS.showErrDialog(error, "pedido");
              }
            );
          }
        },
        () => {
          console.log("FAILED -> delete");
        }
      );
  }

  bloquear(){
    this.UTILS.showUpdatePrompt(new UpdateDialogData('pedido'))
      .then(
        (shallDelete) => {
          if(shallDelete){
            this.pedidoService.bloquear(this.pedido.id).toPromise()
            .then(
              (pedido: Pedido)=>{
                this.snackBar.open("Pedido bloqueado", undefined, {
                  duration: 2000,
                });
                this.router.navigate([`sos/pedidos`]);
              },
              (error: HttpErrorResponse)=>{
                console.error(error);
                this.UTILS.showErrDialog(error, "pedido");
              }
            );
          }
        },
        () => {
          console.log("FAILED -> delete");
        }
      );
  }

  getClientes() {
    this.clienteService.getAll().toPromise().then((records: Array<Clientes>) => {
      this.clientesRecords = records;
    });
  }
  
  getTablaprecios() {
    this.tablapreService.getAll().toPromise().then((records: Array<Tablaprecios>) => {
      this.tablapreRecords = records;
    });
  }

  getReferencias() {
    this.referenciaService.getAll().toPromise().then((records: Array<Referencias>) => {
      this.referenciaRecords = records;
    });
  }

  goBack(){
    this.pedidoResolver.pedido = undefined;
    this.router.navigate(['/sos/pedidos']);    
  }

  get tm() { 
    return this.form.get('tm');
  }

  get prefijo() { 
    return this.form.get('prefijo');
  }

  get documento() { 
    return this.form.get('documento');
  }

  get cod_cliente() { 
    return this.form.get('cod_cliente');
  }

  get fechapedido() { 
    return this.form.get('fechapedido');
  }
  
  get tablaprecio() { 
    return this.form.get('tablaprecio');
  }

  get unidad() { 
    return this.form.get('unidad');
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}