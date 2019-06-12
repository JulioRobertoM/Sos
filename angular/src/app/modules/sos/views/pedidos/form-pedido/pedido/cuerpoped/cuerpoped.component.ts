import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource, MatSortable, MatSnackBar, MatAutocompleteSelectedEvent} from '@angular/material';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/modules/sos/shared/models/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition} from '@angular/animations';
import {trigger} from '@angular/animations';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';
import { Pedido } from 'src/app/modules/sos/shared/models/Pedidos';
import { CuerpoPed } from 'src/app/modules/sos/shared/models/CuerpoPed';
import { FormPedidosResolver } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.resolver';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';
import { Tablaprecios } from 'src/app/modules/sos/shared/models/Tablaprecios';
import { TablaprecioService } from 'src/app/modules/sos/shared/services/tablaprecios/tablaprecios.service';
import { Precios } from 'src/app/modules/sos/shared/models/Precios';
import { PreciosService } from 'src/app/modules/sos/shared/services/precios/precios.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { BuscarPrecioComponent, ResultData } from './buscar-precio/buscar-precio.component';
import { BuscarReferComponent, ResultRefer } from './buscar-referencia/buscar-referencia.component';
import { Subscription } from 'rxjs';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cuerpo-pedido',
  templateUrl: './cuerpoped.component.html',
  styleUrls: ['./cuerpoped.component.scss'],
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

export class CuerpoComponent {

  referenciaRecords: Array<Referencias> = [];
  referencias: Referencias;
  tablapreRecords: Array<Tablaprecios> = [];
  preciosRecords: Array<Precios> = [];
  precioReferencia: Array<Precios> = [];
  tablap: number = 0;
  precioref: number = 0;
  valor: number = 0;
  idproducto: number = 0;
  subscriptionMedia: Subscription;
  isMobileView: boolean;
  precioselect: Tablaprecios;
  tablaprecio: Tablaprecios;

  constructor(private router: Router, public dialog: MatDialog,
              private http: HttpClient,
              private globalService: GlobalService,
              private UTILS: UTILSService,
              private rsoResolver: FormPedidosResolver,
              private pedidoService: PedidoService,
              public activatedRoute: ActivatedRoute,
              private referenciaService: ReferenciaService,
              private tablapreService: TablaprecioService,
              private preciosService: PreciosService,
              private media         : ObservableMedia,
              private snackBar: MatSnackBar) {

  }

  get cantidad() {
    return this.form.get('cantidad');
  }
  /*get tablaprecio() {
    return this.form.get('tablaprecio');
  }*/
  get comencpo() {
    return this.form.get('comencpo');
  }
  get referencia() {
    return this.form.get('referencia');
  }
  get precio() {
    return this.form.get('precio');
  }
  get unidad() {
    return this.form.get('unidad');
  }

  @Input() idForm: number;
  @Input() rsoForm: Pedido;
  @Input() cuerpo: CuerpoPed;
  @Input() user: User;
  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;

  form: FormGroup;
  workSpace;
  listaid: number = 2;
  expandedElement: any;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<CuerpoPed> | null;
  
  private dialogRef: any;

  @ViewChild(MatSort) sort: MatSort;

  isExpansionDetailRow = (index: number, row: Object) => {
    return true;
  }

  ngOnChanges() {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.setDisplayedColumns();
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      this.setDisplayedColumns();
    });

    this.createForm();
    this.getTablaprecios();
    this.getReferencias();
    this.setRefeprecio();
    this.form.get('cantidad').setValue(1);
    this.form.get('valor').setValue(0);
    this.form.get('unidad').setValue('');
    this.dataSource = new MatTableDataSource<CuerpoPed>([]);
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.rsoForm.cuerpoped;
  }

  setDisplayedColumns(){
    
    if(this.isMobileView){
      this.displayedColumns = ['referencia', 'valor','accion'];
    }
    else{
      this.displayedColumns = ['referencia', 'tablaprecio', 'cantidad', 'valor','accion'];
    }
  }

  createForm() {
    this.form = new FormGroup({
        'cantidad': new FormControl('', [
          Validators.required
        ]),
        'valor': new FormControl({value: '',disabled: true}, [
          Validators.required
        ]),
        //'tablaprecio': new FormControl('', [
        //  Validators.required
        //]),
        'comencpo': new FormControl('', [
        ]),
        'unidad': new FormControl('', [
        ]),
        'referencia': new FormControl('', [
        ]),
        'precio': new FormControl('', [
          Validators.required
        ]),
      }
    );
  }

  /*addField() {
    let producto = new FormControl({value: 1, disabled: false}, [
      Validators.required,
      this.userValidator
    ]);

    this.form.addControl('referencia', producto);

    this.form.get('referencia').valueChanges.subscribe((val: string) => {
      this.preciosService.getPrecios(this.tablap).toPromise().then((records: Array<Precios>) => {
        this.preciosRecords = records.filter(records => records.producto.descr.toUpperCase().includes(val) || records.producto.codr.toLowerCase().includes(val));
      })
    });
  }*/

  getAllcuerpo() {
    this.pedidoService.getAllcuerpo(this.idForm).subscribe(
      listRecords => {
        this.dataSource.data = listRecords;
      }
    );
  }

  setExpanded(row) {
    this.expandedElement = row;
  }

  cancelDelete() {
    this.expandedElement = null;
  }

  save() {
    if (this.form.valid) {
      const idcabeza = {
        idcabeza: this.idForm
      };
      let dataCuerpo = this.form.getRawValue();
      dataCuerpo = Object.assign(dataCuerpo, idcabeza);
      const objectCpo = this.UTILS.updateEntity(dataCuerpo, this.form.getRawValue());
      this.pedidoService.savecuerpo(objectCpo).toPromise()
        .then(
          (CpoResponse: CuerpoPed) => {
            this.snackBar.open('Referencia grabada', undefined, {
              duration: 1000,
            });
            //this.createForm();
            this.preciosRecords = null;
            this.setRefeprecio();
            //this.tablapreRecords = null;
            this.form.patchValue({valor: 0 });
            this.form.patchValue({cantidad: 1});
            this.form.patchValue({comencpo:''})
            this.getAllcuerpo();
          },
          (error: HttpErrorResponse) => {
            this.UTILS.showErrDialog(error);
          }
        );
    } else {
      this.UTILS.showIncompleteFormDialog();
    }
  }


  delete(id: number) {
    this.pedidoService.deletecuerpo(id).toPromise()
      .then(
        (rsoDeleted: CuerpoPed) => {
          const index = this.dataSource.data.findIndex(p => p.id === id);
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
          this.snackBar.open('Referencia borrada', undefined, {
            duration: 1000
          });
        }
      );
  }

  getReferencias() {
    this.referenciaService.getAll().toPromise().then((records: Array<Referencias>) => {
      this.referenciaRecords = records;
    });
  }

  getTablaprecios() {
    this.tablapreService.getAll().toPromise().then((records: Array<Tablaprecios>) => {
      this.tablapreRecords = records;
    });
  }

  getByTablaprecios() {
    if (this.tablap) {
      this.tablapreService.getById(this.tablap).subscribe(
        listRecords => {
          this.tablapreRecords = listRecords;
          console.log(this.tablapreRecords);
        }
      );
      /*
      this.tablapreService.getById(this.tablap).toPromise().then((records: Array<Tablaprecios>) => {
        this.tablapreRecords = records;
        console.log(this.tablapreRecords);
      });*/
    }
  }

  setReferencia(event: any) {
    this.tablap = event.id;
    this.setRefeprecio();
  }

  setRefeprecio() {
    if (this.tablap) {
      this.preciosService.getPrecios(this.tablap).toPromise().then((records: Array<Precios>) => {
        this.preciosRecords = records;
      });
    }
  }

  setPrecio(event: any) {
    this.idproducto = event.idreferencia;
    this.precioref = event.precio;
    this.form.patchValue({valor: this.precioref });
  }

  openTopicDialog(cuerpo: CuerpoPed){
    this.dialog.open(BuscarPrecioComponent, {
      disableClose: true,
      width: '580px',
      data: {
        //template: this.template,
        //topic
      }
      }).afterClosed().toPromise().then(
        (resultData: ResultData)=>{
          if(resultData.state === "updated"){
            return;
          }
          else if(resultData.state === "created"){
            //this.topics.push(resultData.data);
          }
          else if(resultData.state === "sel"){
            debugger;
            this.tablaprecio = resultData.data.nombre;
            this.tablapreRecords = resultData.data.nombre;
            this.tablap = resultData.data.id;
            //this.tablaprecio = resultData.data;
            //this.form.patchValue({tablaprecio: resultData.data });
            //this.getByTablaprecios();
            //this.createForm();
            //this.form.get('tablaprecio').setValue(resultData.data);
            //console.log(this.form.getRawValue());
          }
      });
  }  

  openReferDialog(cuerpo: CuerpoPed){
    this.dialog.open(BuscarReferComponent, {
      disableClose: true,
      width: '580px',
      data: {
        //template: this.template,
        //topic
      }
      }).afterClosed().toPromise().then(
        (resultRefer: ResultRefer)=>{
          if(resultRefer.state === "updated"){
            return;
          }
          else if(resultRefer.state === "created"){
            //this.topics.push(resultData.data);
          }
          else if(resultRefer.state === "sel"){
            console.log(resultRefer.data);
            this.precioselect = resultRefer.data;
            this.form.patchValue({precio: resultRefer.data });
            //this.createForm();
            //this.form.get('tablaprecio').setValue(resultRefer.data);
            //console.log(this.form.getRawValue());
          }
      });
  }  

  displayFn(lista: Precios) {
    if (lista) {
      return lista.producto.descr + ' ' + lista.producto.codr;
    }
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  userValidator(control: FormControl) {
    let user = control.value;
  
      if (user instanceof Object) {
        return null;
      } else {
        return {
          userRequired: {
            msg: 'User is required'
          }
        }
      }
  
    }
  
  onChange(value) {
    console.log('Tabla: '+value);
    this.getTablaprecios();
    //this.year = value;
    //updateData();
  }
}