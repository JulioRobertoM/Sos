import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import * as _ from "lodash";
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KardexService } from 'src/app/modules/sos/shared/services/kardex/kardex.service';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';
import { Kardex } from 'src/app/modules/sos/shared/models/Kardex';

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
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})

export class KardexComponent implements OnInit {

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
  codcliente: string;
 
  @Input() idForm: number;

  displayedColumnsPrint: string[] = ['firstName', 'username', 'country', 'city', 'address', 'phone'];

  filterColumns : Array<{name, path}> = [
                  { name: 'Descripción', path: 'descr' },
                  { name: 'Cod. Referencia', path: 'codr' }];

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
              private clienteService: ReferenciaService,
              private carteraService: KardexService, 
              private media         : ObservableMedia,
              private snackBar      : MatSnackBar){
           
    this.createForm();   
    this.datosfecha(); 
    this.getClientes();            
  }

  dataSource: MatTableDataSource<Kardex> | null;
  dataReferencia: MatTableDataSource<Referencias> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit():void {

    this.sosService.get(1).subscribe(
      (datos)=>{
        this.pagenumber = datos.pagenumber;
      });

    this.dataSource = new MatTableDataSource<Kardex>([]);
    this.dataSource.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataReferencia = new MatTableDataSource<Referencias>([]);
    this.dataReferencia.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataReferencia.paginator = this.paginator;
    this.dataReferencia.sort = this.sort;
  
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
      'fecha': new FormControl('', [
      ]),
    },
    );
  }

  datosfecha() {
    const today = new Date().toISOString().split('T')[0];
    this.form.patchValue({fecha: today});
  }

  goBack(){
    this.router.navigate(['/sos']);    
  }

  get fecha() { 
    return this.form.get('fecha');
  }

  get cliente() { 
    return this.form.get('cliente');
  }

  setDisplayedColumns(){
    if(this.isMobileView){
      this.hidePageSize = true;
      this.displayedColumns = ['codr','descr','existencia'];
      this.displayedCliente = ['codr','descr'];
    }
    else{
      this.hidePageSize = false;
      this.displayedColumns = ['codr','descr','unid','bodega','existencia'];
      this.displayedCliente = ['codr','descr'];
    }
  }

  getClientes() {
    this.clienteService.getAll().toPromise().then((records: Array<Referencias>) => {
      this.dataReferencia.data = records;
      this.totalclientes = this.dataReferencia.data.length;
    });
  }

  setCliente(event: any) {
    this.isDatos = true;
    this.isConsulta = true;
    this.codcliente = event.codr;
    console.log(this.codcliente);
    if (this.codcliente) {
      this.consultar();
    }
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
      this.carteraService.getExistencias(this.fecha.value,this.codcliente).toPromise().then((records: Array<Kardex>) => {
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
      header: "<span style='font-family: Roboto; font-size: 20px; font-weight: bold'>Existencias de Inventario</span>",
      importCSS: true,
      importStyle: true,
      loadCSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    });
  }

}
