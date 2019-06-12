import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import * as _ from "lodash";
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { ClienteService } from 'src/app/modules/sos/shared/services/clientes/clientes.service';
import { Clientes } from 'src/app/modules/sos/shared/models/Clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarteraService } from 'src/app/modules/sos/shared/services/cartera/cartera.service';
import { Cartera } from 'src/app/modules/sos/shared/models/Cartera';
import { DocCartera } from 'src/app/modules/sos/shared/models/Doccartera';

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
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})

export class CarteraComponent implements OnInit {

  subscriptionMedia: Subscription;
  isMobileView: boolean;
  isConsulta: boolean;
  isDatos: boolean = true;
  pagenumber: number = 10;
  totalSize: number = 10;
  pageclientes: number = 5;
  hidePageSize: boolean = true;
  totalclientes: number = 10;
  duracion: number = 2000;
  form: FormGroup;
  cliente: Clientes;
  cartera: Cartera;
  codcliente: string;
  nomcliente: string;
  nitcliente: string;
  dircliente: string;
  telcliente: string;
  emacliente: string;
  clientesRecords: Array<Clientes> = [];
 
  @Input() idForm: number;
  @Input() carteraForm: Cartera;
  @Input() cuerpo: DocCartera;

  displayedColumnsPrint: string[] = ['firstName', 'username', 'country', 'city', 'address', 'phone'];

  filterColumns : Array<{name, path}> = [
                  { name: 'Nombre', path: 'nombrecli' },
                  { name: 'Nit Cliente', path: 'codcli' }];

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
    this.getClientes();            
  }

  dataSource: MatTableDataSource<DocCartera> | null;
  dataClientes: MatTableDataSource<Clientes> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit():void {

    this.sosService.get(1).subscribe(
      (datos)=>{
        this.pagenumber = datos.pagenumber;
      });

    this.dataSource = new MatTableDataSource<DocCartera>([]);
    this.dataSource.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataClientes = new MatTableDataSource<Clientes>([]);
    this.dataClientes.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataClientes.paginator = this.paginator;
    this.dataClientes.sort = this.sort;
  
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.setDisplayedColumns();
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      this.setDisplayedColumns();
    });
  }

  createForm() {
    this.form = new FormGroup({
      'cliente': new FormControl('', [
      ]),
    },
    );
  }

  goBack(){
    this.router.navigate(['/sos']);    
  }

  setDisplayedColumns(){
    if(this.isMobileView){
      this.hidePageSize = true;
      this.displayedColumns = ['nombretd','vrfaccar'];
      this.displayedCliente = ['codcli','nombrecli'];
    }
    else{
      this.hidePageSize = false;
      this.displayedColumns = ['nombretd','codigotd','prefijocar',
      'docucar','fechacar','mora','vrfaccar'];
      this.displayedCliente = ['codcli','nombrecli'];
    }
  }

  getClientes() {
    this.clienteService.getAll().toPromise().then((records: Array<Clientes>) => {
      this.clientesRecords = records;
      this.dataClientes.data = records;
      this.totalclientes = this.dataClientes.data.length;
    });
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.vrfaccar).reduce((acc, value) => acc + value, 0);
  }

  setCliente(event: any) {
    console.log('Pase..');
    console.log( event.codcli);
    console.log( event.nombrecli);
    this.isDatos = true;
    this.isConsulta = true;
    this.codcliente = event.codcli;
    if (this.codcliente) {
      this.consultar();
    }
    this.nomcliente = event.nombrecli;
    this.nitcliente = event.codcli+'-'+event.digitocli;
    this.dircliente = event.direccioncli;
    this.telcliente = event.telefonocli;
    this.emacliente = event.emailcli;
  }

  cambiar() {
    this.codcliente = null;
    this.isDatos = true;
    this.isConsulta = false;
    this.getClientes();
  }
  consultar(){
    if(this.form.valid) {
      
      /*this.carteraService.getCartera(this.codcliente).subscribe(
        listRecords => {
          this.dataSource.data = listRecords;
          //this.dataSource = listRecords;
          console.log(this.dataSource.data);
          this.isConsulta = true;
          this.snackBar.open("Consulta generada.-.-.", undefined, {
            duration: 2000,
          });
        }
      );*/
      this.carteraService.getCartera(this.codcliente).toPromise().then((records: Array<DocCartera>) => {
        this.dataSource.data = records;
        this.dataSource.sort = this.sort;
        this.isDatos = true;
        this.isConsulta = true;
        if (this.dataSource.data.length == 0) {
          this.isDatos = false;
          this.isConsulta = false;
          this.duracion = 200;
          this.snackBar.open("Consulta generada sin datos de Cartera.", undefined, {
            duration: this.duracion,
          });
        }
        else {
          this.duracion = 2000;
          this.snackBar.open("Consulta generada.", undefined, {
            duration: this.duracion,
          });
        }
      });

    }
    else {
        this.isConsulta = false;
        this.UTILS.showIncompleteFormDialog();
      }
  }

  public printThis(): void {
    $('#listPedidos').printThis({
      header: "<span style='font-family: Roboto; font-size: 20px; font-weight: bold'>Cartera</span>",
      importCSS: true,
      importStyle: true,
      loadCSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    });
  }

}
