import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSort, MatSortable, MatSnackBar, MatPaginator, 
  MatTableDataSource } from '@angular/material';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchByComponent } from 'src/app/modules/sos/shared/components/search-by/search-by.component';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import * as _ from "lodash";
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { TablaprecioService } from 'src/app/modules/sos/shared/services/tablaprecios/tablaprecios.service';
import { Tablaprecios } from 'src/app/modules/sos/shared/models/Tablaprecios';

@Component({
  selector: 'app-buscar-precio',
  templateUrl: './buscar-precio.component.html',
  styleUrls: ['./buscar-precio.component.css']
})
export class BuscarPrecioComponent implements OnInit {

  form: FormGroup;
  pagenumber: number = 5;
  totalSize: number = 10;
  subscriptionMedia: Subscription;
  isMobileView: boolean;
  
  filterColumns : Array<{name, path}> = [
      { name: 'Codigo', path: 'codigo' },
      { name: 'Nombre', path: 'nombre' }];

  displayedColumns : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
    }, []);

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private UTILSService  : UTILSService,
              public dialogRef      : MatDialogRef<BuscarPrecioComponent>,
              private tablapService: TablaprecioService,
              private sosService    : SOSService,
              private snackBar      : MatSnackBar,
              private media         : ObservableMedia) {
              }
  
  dataRefer: MatTableDataSource<Tablaprecios> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() { 
    this.createForm();
    this.setDisplayedColumns();
    //this.getReferencias();
    this.dataRefer = new MatTableDataSource<Tablaprecios>([]);
    this.dataRefer.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataRefer.paginator = this.paginator;
    this.sort.sort(<MatSortable>{
      id: 'codigo',
      start: 'asc'
    });

    this.sort.start = "asc";
    this.sort.direction = "asc";
    this.sort.active = 'codigo';

    this.dataRefer.sort = this.sort;
    this.sosService.get(1).subscribe(
      (datos)=>{
        this.pagenumber = datos.pagenumber;
      });
    this.tablapService.getAll().subscribe(
      (productos) => {
        this.dataRefer.data = productos;
        this.dataRefer.paginator = this.paginator;
      }
    );

  }

  /*getReferencias() {
    this.tablapService.getAll().toPromise().then((records: Array<Referencias>) => {
      this.dataRefer.data = records;
    });
  }*/

  ngOnChanges() {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.setDisplayedColumns();
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      this.setDisplayedColumns();
    });
  }

  setDisplayedColumns(){
    if(this.isMobileView){
      this.displayedColumns = ['codigo', 'nombre'];
    }
    else{
      this.displayedColumns = ['codigo', 'nombre'];
    }
  }

  applyFilter = (filterValue: string) => this.UTILSService.applyFilterToTable(filterValue, this.dataRefer);
  
  getFilterName(column) {
    return column.split(".")[0];
  }  
    
  createForm() {
    this.form = new FormGroup({
      'codigo': new FormControl('', [
      ]),   
      'nombre': new FormControl('', [
      ]),      

    });

  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  selitem(event: any) {
    this.dialogRef.close({ state: "sel", data: event });
  }
  
  close(){
    this.dialogRef.close({ state: "cancelled", data: null });
  }
  
  get codigo() {
    return this.form.get('codigo');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  
  onScroll() {
  }
}

export interface ResultData {

  state: string; 
  data: any;

}