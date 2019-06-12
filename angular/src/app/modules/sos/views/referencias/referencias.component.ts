import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import * as _ from "lodash";
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';
import { ReferenciasResolver } from 'src/app/modules/sos/views/referencias/referencia/referencia.resolver';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';

declare var $: any;

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {

  subscriptionMedia: Subscription;
  isMobileView: boolean;
  pagenumber: number = 5;
  totalSize: number = 10;
  hidePageSize: boolean = true;

  @Input() idForm: number;

  displayedColumnsPrint: string[] = ['firstName', 'username', 'country', 'city', 'address', 'phone'];

  filterColumns : Array<{name, path}> = [
                  { name: 'Código', path: 'codr' },
                  { name: 'Nombre', path: 'descr' }];

  displayedColumns : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
  }, []);

  constructor(public  globalService : GlobalService,
              public  referenciaResolver: ReferenciasResolver,
              private referenciaService : ReferenciaService,
              private UTILSService  : UTILSService,
              private router        : Router,
              private sosService    : SOSService,
              private media         : ObservableMedia){
  }

  filterBy : string;

  dataSource: MatTableDataSource<Referencias> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit():void {

    this.dataSource = new MatTableDataSource<Referencias>([]);
    this.dataSource.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataSource.paginator = this.paginator;

    this.sort.sort(<MatSortable>{
      id: 'firstName',
      start: 'asc'
    });

    this.sort.start = "asc";
    this.sort.direction = "asc";
    this.sort.active = 'firstName';

    this.dataSource.sort = this.sort;
    this.sosService.get(1).subscribe(
      (datos)=>{
        this.pagenumber = datos.pagenumber;
      });

    this.referenciaService.getAll().subscribe(
      referencias => {
        this.dataSource.data = referencias;
        this.dataSource.paginator = this.paginator;
      }
    );

    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.setDisplayedColumns();
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
      this.setDisplayedColumns();
    });
  }

  ngAfterViewInit() {
    // this.paginator.page
    //     .pipe(
    //         tap(() => this.loadLessonsPage())
    //     )
    //     .subscribe();
  }

  loadLessonsPage() {
    // this.dataSource.loadreferencias();
  }

  setDisplayedColumns(){
    if(this.isMobileView){
      this.hidePageSize = true;
      this.displayedColumns = ['codr', 'descr'];
    }
    else{
      this.hidePageSize = false;
      this.displayedColumns = ['codr', 'descr','unid'];
    }
  }

  applyFilter = (filterValue: string) => this.UTILSService.applyFilterToTable(filterValue, this.dataSource);

  getFilterName(column) {
    return column.split(".")[0];
  }  

  goToPedido(referencia) {
    this.referenciaResolver.referencia = referencia ? referencia : new Referencias();
    this.router.navigate([`sos/referencias/${referencia ? referencia.id : 'new'}`]);
  }

  onScroll() {
  }

  goBack(){
    this.router.navigate(['/sos']);    
  }
  
  public printThis(): void {
    $('#listPedidos').printThis({
      header: "<span style='font-family: Roboto; font-size: 20px; font-weight: bold'>Listado de Referencias</span>",
      importCSS: true,
      importStyle: true,
      loadCSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    });
  }

}
