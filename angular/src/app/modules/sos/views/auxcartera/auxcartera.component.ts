import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import * as _ from "lodash";
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { ClienteService } from 'src/app/modules/sos/shared/services/clientes/clientes.service';
import { Clientes } from 'src/app/modules/sos/shared/models/Clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarteraService } from 'src/app/modules/sos/shared/services/cartera/cartera.service';
import { Cartera } from 'src/app/modules/sos/shared/models/Cartera';
import { DocAuxCartera } from 'src/app/modules/sos/shared/models/DocAuxCartera';

declare var $: any;

export interface PeriodicElement {
  file: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {file: 'COD123', date: '19/02/2018'},
  {file: 'COD789', date: '09/05/2018'},
  {file: 'COD999', date: '23/04/2018'}
];

@Component({
  selector: 'app-auxcartera',
  templateUrl: './auxcartera.component.html',
  styleUrls: ['./auxcartera.component.css']
})

export class AuxCarteraComponent implements OnInit {

  subscriptionMedia: Subscription;
  isMobileView: boolean;
  isConsulta: boolean;
  isDatos: boolean = true;
  pagenumber: number = 5;
  totalSize: number = 10;
  form: FormGroup;
  cliente: Clientes;
  cartera: Cartera;
  total: number = 0;
  fecha2s: string;
  codcliente: string;
  nomcliente: string;
  nitcliente: string;
  dircliente: string;
  telcliente: string;
  emacliente: string;
  clientesRecords: Array<Clientes> = [];

  @Input() idForm: number;
  @Input() carteraForm: Cartera;
 
  displayedColumnsPrint: string[] = ['firstName', 'username', 'country', 'city', 'address', 'phone'];

  filterColumns : Array<{name, path}> = [
                  { name: 'Tipo', path: 'codigotd' },
                  { name: 'Descripción', path: 'nombretd' }];

  displayedColumns : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
  }, []);

  displayedCliente : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
  }, []);

  constructor(public  globalService : GlobalService,
              private UTILS         : UTILSService,
              private router        : Router,
              private sosService    : SOSService,
              private clienteService: ClienteService,
              private carteraService: CarteraService, 
              private media         : ObservableMedia,
              private snackBar      : MatSnackBar){
           
    this.createForm();    
    this.datosfecha(); 
    this.getClientes();            
  }

  dataSource: MatTableDataSource<DocAuxCartera> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit():void {


    //this.dataSource.sort = this.sort;
    this.sosService.get(1).subscribe(
      (datos)=>{
        this.pagenumber = datos.pagenumber;
      });

    this.dataSource = new MatTableDataSource<DocAuxCartera>([]);
    this.dataSource.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataSource.paginator = this.paginator;
  
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.setDisplayedColumns();
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      this.setDisplayedColumns();
    });
  }

  datosfecha() {
    const today = new Date().toISOString().split('T')[0];
    var antes = new Date();
    var fechauno = new Date(antes.getFullYear(),antes.getMonth(),1);
    var diauno = fechauno.toISOString().split('T')[0];
    this.fecha.patchValue(diauno);
    this.fechafin.patchValue(today);
  }

  createForm() {
    this.form = new FormGroup({
      'fecha': new FormControl('', [
        Validators.required,
      ]),
      'fechafin': new FormControl('', [
        Validators.required,
      ]),
      'cliente': new FormControl('', [
        Validators.required,
      ]),
    },
    );
  }

  get fecha() { 
    return this.form.get('fecha');
  }
  get fechafin() { 
    return this.form.get('fechafin');
  }

  goBack(){
    this.router.navigate(['/sos']);    
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.debito-t.credito).reduce((acc, value) => acc + value, 0);
  }
  getTotalDebito() {
    return this.dataSource.data.map(t => t.debito).reduce((acc, value) => acc + value, 0);
  }
  getTotalCredito() {
    return this.dataSource.data.map(t => t.credito).reduce((acc, value) => acc + value, 0);
  }

  setDisplayedColumns(){
    if(this.isMobileView){
      this.displayedColumns = ['nombretd','vrfaccar'];
      this.displayedCliente = ['numnitcar','nombrecli'];
    }
    else{
      this.displayedColumns = ['nombretd','codigotd','prefijocar',
      'docucar','fechacar','debito','credito','vrfaccar'];
      this.displayedCliente = ['numnitcar','nombrecli','direccioncli','telefonocli','emailcli'];
    }
  }

  getClientes() {
    this.clienteService.getAll().toPromise().then((records: Array<Clientes>) => {
      this.clientesRecords = records;
    });
  }

  setCliente(event: any) {
    this.codcliente = event.codcli;
    this.nomcliente = event.nombrecli;
    this.nitcliente = event.codcli+'-'+event.digitocli;
    this.dircliente = event.direccioncli;
    this.telcliente = event.telefonocli;
    this.emacliente = event.emailcli;
   }

  consultar(){
    if(this.form.valid) {
      this.carteraService.getAuxCartera(this.fecha.value,this.fechafin.value,this.codcliente).subscribe(
        listRecords => {
          this.dataSource.data = listRecords;
          this.dataSource.paginator = this.paginator;
          this.isDatos = true;
          this.isConsulta = true;
          if (this.dataSource.data.length == 0) {
            this.isDatos = false;
            this.isConsulta = false;
          }
          this.snackBar.open("Consulta generada.-.-.", undefined, {
            duration: 2000,
          });
        }
      );

      /*
      this.carteraService.getAuxCartera(this.fecha.value,this.fechafin.value,this.codcliente).toPromise().
      then((records: Array<DocAuxCartera>) => {
        debugger;
        this.dataSource.data = records;
        this.isDatos = true;
        this.isConsulta = true;
        if (this.dataSource.data.length == 0) {
          this.isDatos = false;
          this.isConsulta = false;
        }

        console.log(this.dataSource.data);
      });*/

    }
    else {
        this.isConsulta = false;
        this.UTILS.showIncompleteFormDialog();
      }
  }

  public printThis(): void {
    $('#listPedidos').printThis({
      header: "<span style='font-family: Roboto; font-size: 20px; font-weight: bold'>Auxiliar de Cartera</span>",
      importCSS: true,
      importStyle: true,
      loadCSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    });
  }

}
