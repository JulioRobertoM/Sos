import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSortable } from '@angular/material';
import { RolResolver } from './rol/rol-resolver.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import * as _ from "lodash";
import { RoleMenu } from 'src/app/modules/sos/shared/models/RoleMenu';
import { RoleMenuService } from 'src/app/modules/sos/shared/services/rolemenu/rolemenu.service';
import { Rol } from 'src/app/modules/sos/shared/models/Rol';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { RolService } from 'src/app/modules/sos/shared/services/rol/rol.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  
  subscriptionMedia: Subscription;
  isMobileView: boolean;
  pagenumber: number = 5;
  totalSize: number = 10;
  hidePageSize: boolean = true;
  filterColumns : Array<{name, path}> = 
    [{ name: 'Nombre', path: 'nombrerol' },
 ];

  displayedColumns : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
    }, []);

  constructor(public rolResolver: RolResolver,
              public rolService: RolService,
              public activatedRoute: ActivatedRoute,
              private sosService    : SOSService,
              private media         : ObservableMedia,
              private router : Router) { }

  dataSource : MatTableDataSource<Rol>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.dataSource = new MatTableDataSource<Rol>([]);
    this.dataSource.sortingDataAccessor = (data, header) => _.get(data, header);

    this.sort.sort(<MatSortable>{
      id: 'name',
      start: 'asc'
    });

    this.sort.start = "asc";
    this.sort.direction = "asc";
    this.sort.active = 'name';

    this.dataSource.sort = this.sort;
    this.sosService.get(1).subscribe(
      (datos)=>{
        this.pagenumber = datos.pagenumber;
      });

    this.rolService.getAll().subscribe(
      (roles)=>{
        this.dataSource.data = roles;
        this.dataSource.paginator = this.paginator;
      });

      this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
      this.setDisplayedColumns();
      this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
        this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
        this.setDisplayedColumns();
      });  
  }

  goToRol(rol) {
    this.rolResolver.rol = rol ? rol : new Rol();
    this.router.navigate([`sos/settings/roles/${rol ? rol.id : 'new'}`]);
  }

  onScroll() {
    //this.dataSource.loadUsers();
    // this.userService.getAll({})
  }

  setDisplayedColumns(){
    if(this.isMobileView){
      this.hidePageSize = true;
    }
    else{
      this.hidePageSize = false;
    }
  }

  goBack(){
    this.router.navigate(['/sos/settings']);    
  }
  
  getFilterName(column) {
    const strings = column.split(".");
    return strings[0];
  }
}
