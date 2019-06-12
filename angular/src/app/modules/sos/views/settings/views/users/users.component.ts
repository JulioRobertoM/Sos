import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserResolver } from './user/user.resolver';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { UserService } from '../../../../shared/services/user/user.service';
import { UTILSService } from '../../../../shared/services/utils/utils.service';
import { User } from '../../../../shared/models/User';
import { GlobalService } from '../../../../shared/services/global/global.service';
import * as _ from "lodash";
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  subscriptionMedia: Subscription;
  isMobileView: boolean;
  hidePageSize: boolean = true;
  pagenumber: number = 5;
  totalSize: number = 10;

  displayedColumnsPrint: string[] = ['firstName', 'username', 'country', 'city', 'address', 'phone'];

  filterColumns : Array<{name, path}> = 
                  [{ name: 'Login', path: 'login' },
                   { name: 'Nombre', path: 'nombre' },
                   { name: 'Rol', path: 'rol.nombrerol' },
                   { name: 'Dirección', path: 'direccion' },
                   { name: 'Telefono', path: 'telefono' }];

  displayedColumns : Array<String> = this.filterColumns.reduce( (arr, column) => {
    arr.push(column.path);
    return arr;
  }, []);

  constructor(public  globalService : GlobalService,
              public  userResolver  : UserResolver,
              private userService   : UserService,
              private UTILSService  : UTILSService,
              private sosService    : SOSService,
              private router        : Router,
              private media         : ObservableMedia){
  }

  filterBy : string;

  // dataSource: FilesDataSource | null;
  dataSource: MatTableDataSource<User> | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.dataSource = new MatTableDataSource<User>([]);
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

    this.userService.getAll().subscribe(
      users => {
        this.dataSource.data = users;
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
    // this.dataSource.loadUsers();
  }

  goBack(){
    this.router.navigate(['/sos/settings']);    
  }
  
  setDisplayedColumns(){
    if(this.isMobileView){
      this.hidePageSize = true;
      this.displayedColumns = ['login', 'nombre'];
    }
    else{
      this.hidePageSize = false;
      this.displayedColumns = ['login', 'nombre', 'rol', 'direccion', 'telefono'];
    }
  }

  applyFilter = (filterValue: string) => this.UTILSService.applyFilterToTable(filterValue, this.dataSource);

  getFilterName(column) {
    return column.split(".")[0];
  }  

  goToUser(user) {
    this.userResolver.user = user ? user : new User();
    this.router.navigate([`sos/settings/users/${user ? user.id : 'new'}`]);
  }

  onScroll() {
    //this.dataSource.loadUsers();
    // this.userService.getAll({})
    //                 .subscribe(lessons => this.dataSource.loadLessons());
    
  }

  public printThis(): void {
    $('#listUsers').printThis({
      header: "<span style='font-family: Roboto; font-size: 20px; font-weight: bold'>Users List</span>",
      importCSS: true,
      importStyle: true,
      loadCSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    });
  }

}
