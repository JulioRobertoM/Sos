import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { GlobalService } from "../../shared/services/global/global.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  title = 'app';

  user;

  events = [];
  openedLeft : Boolean = false;
  openedRight : Boolean = false;

  options: FormGroup;
  subscriptionMedia: Subscription;
  isMobileView: boolean;
  openSidenav: boolean;

  currentURL : string;

  constructor(private router: Router,
              fb: FormBuilder,
              private media: ObservableMedia,
              private globalService: GlobalService) {

    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });

    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.currentURL = val.url;
      }
    });

  }

  ngAfterContentInit() {
    this.currentURL = this.router.url;   
  }

  displayedColumns : Array<string> = ['rol', 'nombre', 'contacto', 'id', 'telefono',
                                      'pais', 'ciudad', 'direccion'];

  filterBy : string = this.displayedColumns[0];

  dataSource = new MatTableDataSource<User>(USERS_DATA);

  auxiliarTables = [
    { label: 'General', URL: 'sos/settings/generals' },
    { label: 'Ubicaciones', URL: 'ubicaciones'}
  ];

  auxiliarSelected = this.auxiliarTables[0];

  @ViewChild(MatPaginator) paginator: MatPaginator;  

  ngOnInit() {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md'));
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm' || change.mqAlias === 'md');
    });
    this.user = this.globalService.user;
  }

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches string.indexOf(substring) !== -1;

    this.dataSource.filter = filterValue;    
    this.dataSource.filterPredicate = (usuario: User, filter: string) => 
      String(usuario[this.filterBy]).toLowerCase().trim().indexOf(filter) !== -1;

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  onChangeAuxiliar(auxiliarSelected){
    this.router.navigate([ '/' + auxiliarSelected.URL]);
    console.log(auxiliarSelected.URL);
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.label === c2.label : c1 === c2;
  }

  toggleForceOpen(){
    this.openSidenav = !this.openSidenav;
  }

  //Fixes bug when sidenav closed by clicking in the side content
  closedStart(){
    this.openSidenav = false;
  }

}

export interface User {
  rol: string;
  nombre: string;
  contacto: string;
  id: string;
  telefono: string;
  pais: string;
  ciudad: string;
  direccion: string;
}

const USERS_DATA: User[] = [
  {rol: "Operador", nombre: "John Doe 1", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Mecánico", nombre: "John Doe 2", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 3", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 4", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Ingeniero", nombre: "John Doe 5", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 6", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Contador", nombre: "John Doe 7", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 8", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Auditor", nombre: "John Doe 9", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 10", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 11", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 12", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 13", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 14", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 15", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 16", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 17", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 18", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 19", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"},
  {rol: "Operador", nombre: "John Doe 20", contacto: "johndoe@mail.com", id: "124124", telefono: "5465464577", pais: "USA", ciudad: "Springfield", direccion: "St. Anders 121244"}
];
