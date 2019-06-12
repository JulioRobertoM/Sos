import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import * as _ from "lodash";
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { PedidoService } from 'src/app/modules/sos/shared/services/pedidos/pedidos.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { Pedido } from 'src/app/modules/sos/shared/models/Pedidos';
import { User } from 'src/app/modules/sos/shared/models/User';
import { FormPedidosResolver } from 'src/app/modules/sos/views/pedidos/form-pedido/form-pedido.resolver';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';

declare var $: any;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  subscriptionMedia: Subscription;
  isMobileView: boolean;
  pagenumber: number = 5;
  totalSize: number = 10;
  hidePageSize: boolean = true;

  @Input() idForm: number;
  @Input() rsoForm: Pedido;
  @Input() user: User;

  displayedColumnsPrint: string[] = ['firstName', 'username', 'country', 'city', 'address', 'phone'];

  filterColumns : Array<{name, path}> = [
                  { name: 'Tm', path: 'tm' },
                  { name: 'Prefijo', path: 'prefijo' },
                  { name: 'Documento', path: 'documento' },
                  { name: 'Cliente', path: 'codcli' },
                  { name: 'Nombre', path: 'nombrecli' },
                  { name: 'Fecha', path: 'fecha' }];

  displayedColumns : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
  }, []);

  constructor(public  globalService : GlobalService,
              public  pedidoResolver: FormPedidosResolver,
              private pedidoService : PedidoService,
              private UTILSService  : UTILSService,
              private router        : Router,
              private sosService    : SOSService,
              private media         : ObservableMedia){
  }

  filterBy : string;

  dataSource: MatTableDataSource<Pedido> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit():void {

    this.dataSource = new MatTableDataSource<Pedido>([]);
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

    this.pedidoService.getAll().subscribe(
      pedidos => {
        this.dataSource.data = pedidos;
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
    // this.dataSource.loadPedidos();
  }

  goBack(){
    this.router.navigate(['/sos']);    
  }
  
  setDisplayedColumns(){
    if(this.isMobileView){
      this.hidePageSize = true;
      this.displayedColumns = ['tm', 'nombrecli','fecha'];
    }
    else{
      this.hidePageSize = false;
      this.displayedColumns = ['tm', 'prefijo','documento', 'codcli', 'nombrecli','fecha','estado'];
    }
  }

  applyFilter = (filterValue: string) => this.UTILSService.applyFilterToTable(filterValue, this.dataSource);

  getFilterName(column) {
    return column.split(".")[0];
  }  

  goToPedido(pedido) {
    this.pedidoResolver.pedido = pedido ? pedido : new Pedido();
    this.router.navigate([`sos/pedidos/${pedido ? pedido.id : 'new'}`]);
  }

  onScroll() {
  }

  public printThis(): void {
    $('#listPedidos').printThis({
      header: "<span style='font-family: Roboto; font-size: 20px; font-weight: bold'>Pedidos List</span>",
      importCSS: true,
      importStyle: true,
      loadCSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    });
  }

}
