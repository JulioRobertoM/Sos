import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSortable } from '@angular/material';
import { RolResolver } from './rol-resolver.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Menu } from 'src/app/modules/sos/shared/models/Menu';
import { MenuService } from 'src/app/modules/sos/shared/services/menusms/menusms.service';
import * as _ from "lodash";
import { RoleMenu } from 'src/app/modules/sos/shared/models/RoleMenu';
import { Rol } from 'src/app/modules/sos/shared/models/Rol';
import { RoleMenuService } from 'src/app/modules/sos/shared/services/rolemenu/rolemenu.service';
import { DeleteDialogData } from 'src/app/modules/sos/shared/components/delete-dialog/delete-dialog.component';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { RolService } from 'src/app/modules/sos/shared/services/rol/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})

export class RolComponent implements OnInit {

  form: FormGroup;
  rol: Rol;
  chequeo: boolean = false;
  rolmenu : RoleMenu;
  dataSource : MatTableDataSource<RoleMenu>| null;
  Permisos: Array<any> = [];

  filterColumns : Array<{name, path}> = 
  [
    { name: 'Codigo', path: 'codigo' },
    { name: 'Nombre', path: 'nombremenu' },
    { name: '', path: 'sel' },
  ];

  displayedColumns : Array<String>;

  filterBy : {name, path};

  constructor(private rolResolver: RolResolver,
              public rolService: RolService,
              private router : Router,
              private menuService: MenuService,
              public activatedRoute: ActivatedRoute,
              public rolemenu: RoleMenuService,
              private UTILS  : UTILSService,
              private snackBar: MatSnackBar) {

    this.rol = rolResolver.rol ? rolResolver.rol : new Rol();
    this.displayedColumns = this.filterColumns.reduce( (arr, column) => {
      arr.push(column.path);
      return arr;
    }, []);
    
    this.createForm();
  }

  @ViewChild(MatSort) sort: MatSort;
  ubicaActiva: string = '';
  ngOnInit() {

    this.dataSource = new MatTableDataSource<RoleMenu>([]);
    this.dataSource.sortingDataAccessor = (data, header) => _.get(data, header);
    this.dataSource.sort = this.sort;
    this.rolemenu.getRolMenu(this.rol.id).subscribe(
      (opcmenu)=>{
        this.dataSource.data = opcmenu;
        this.chequeo = true;
      });
    this.rolemenu.getRolMenu(this.rol.id).toPromise()
      .then(
      (opcmenu)=>{
        this.dataSource = opcmenu;
        this.chequeo = true;
      });

    let i: number = 0;
    if (this.dataSource.data.length > 0) {
      for (i=0; i < this.dataSource.data.length; i++) {
        this.Permisos[i].codigo = this.dataSource.data[i].codigo;
        console.log('Permi: '+i+' '+this.Permisos[i].codigo);
      }
    }
  }

  goBack() {
    this.rolResolver.rol = undefined;
    this.router.navigate(['sos/settings/roles']);
  }

  createForm() {
    this.form = new FormGroup({
      'nombrerol': new FormControl(this.rol.nombrerol, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
    });
  }  

  onChange(ob: MatSlideToggleChange, codigonew) {
    if (ob.checked == true) {
      this.Permisos.push(codigonew);
    }
    else {
      this.Permisos.splice(this.Permisos.indexOf(codigonew), 1 );
    }
  }  

  get nombrerol() { 
    return this.form.get('nombrerol');
  }

  save(){

  if(this.form.valid) {
    let objeto;
    if (this.Permisos.length > 0) {
      this.rolemenu.delete(this.rol.id).toPromise()
      .then(
        (rolemenu: RoleMenu)=>{
          //this.snackBar.open("Permisos borrados correctamente.", undefined, {
          //  duration: 100,
          //});
        },
        (error: HttpErrorResponse)=>{
        }
      )
    }
    let i: number = 0;
    if (this.Permisos.length > 0) {
      for ( i=0; i < this.Permisos.length; i++) { 
        objeto={
          idrole: this.rol.id,
          codigo: this.Permisos[i],
        } 
        const menuRol = objeto;
        this.rolemenu.save(menuRol).toPromise()
          .then(
            (rolemenu1: RoleMenu)=>{
            },
            (error: HttpErrorResponse)=>{
              this.UTILS.showErrDialog(error);
            }
        );
      }
      /*this.snackBar.open("Rol grabado correctamente.", undefined, {
        duration: 1000,
      });*/
    }
    const updatedRol = this.UTILS.updateEntity(this.rol, this.form.getRawValue());
    this.rolService.save(updatedRol).toPromise()
      .then(
        (rol: Rol)=>{
          this.snackBar.open("Rol grabado correctamente...", undefined, {
            duration: 1000,
          });
          if (this.rol.id) {
            this.rol = rol;
            this.router.navigate(['sos/settings/roles']);
          }
          else {
            this.rol = rol;
            this.router.navigate(['sos/settings/roles/${this.rol.id}']);
          }  
        },
        (error: HttpErrorResponse)=>{
          //console.error(error);
          this.UTILS.showErrDialog(error);
        }
    );
    }
    else {
      this.UTILS.showIncompleteFormDialog();
    }
  }

  saveMenu(){
    const updatedRol = this.UTILS.updateEntity(this.rol, this.form.getRawValue());
    this.rolService.save(updatedRol).toPromise()
      .then(
        (rol: Rol)=>{
          this.snackBar.open("Rol grabado correctamente.", undefined, {
            duration: 1000,
          });
          this.rol = rol;
          this.router.navigate(['sos/roles']);
        },
        (error: HttpErrorResponse)=>{
          console.error(error);
          this.UTILS.showErrDialog(error);
        }
    );
  }

  delete(){
    this.UTILS.showDeletePrompt(new DeleteDialogData('rol'))
      .then(
        (shallDelete) => {
          if(shallDelete){
            this.rolService.delete(this.rol.id).toPromise()
            .then(
              (rol: Rol)=>{
                this.router.navigate(['sos/settings/roles']);
                this.snackBar.open("Rol borrado correctamente", undefined, {
                  duration: 2000,
                });
              },
              (error: HttpErrorResponse)=>{
                console.error(error);
                this.UTILS.showErrDialog(error, "rol");
              }
            );
          }
        },
        () => {
          console.log("FAILED -> delete");
        }
      );
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }  

}