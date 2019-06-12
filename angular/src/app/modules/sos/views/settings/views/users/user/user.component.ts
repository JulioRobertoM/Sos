import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserResolver } from './user.resolver';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../../../shared/models/User';
import { UTILSService } from '../../../../../shared/services/utils/utils.service';
import { UserService } from '../../../../../shared/services/user/user.service';
import { DeleteDialogData } from 'src/app/modules/sos/shared/components/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { RolService } from 'src/app/modules/sos/shared/services/rol/rol.service';
import { Rol } from 'src/app/modules/sos/shared/models/Rol';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: FormGroup;
  user: User;
  showPassword: boolean = false;
  countryControl : FormControl;
  rolRecords: Array<Rol> = [];

  constructor(private UTILS: UTILSService,
              private userResolver: UserResolver,
              private userService : UserService,
              private router : Router,
              private rolService: RolService,
              private snackBar: MatSnackBar) {

    this.user = this.userResolver.user ? this.userResolver.user : new User();

    if(!this.user.id){
      this.showPassword = true;
    }

    this.createForm();
    this.getRoles();
    this.form.get('idempresa').setValue(1);
  }

  ngOnInit() {}

  getRoles() {
    this.rolService.getAll().toPromise().then((records) => {
      this.rolRecords = records;
    });
  }

  createForm() {
    this.form = new FormGroup({
      'login': new FormControl(this.user.login, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      'password': new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      'password2': new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      'nombre': new FormControl(this.user.nombre, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      'apellido': new FormControl(this.user.apellido, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      'cargo': new FormControl(this.user.cargo, [
      ]),
      'email': new FormControl(this.user.email, [
      ]),
      'telefono': new FormControl(this.user.telefono, [
      ]),
      'direccion': new FormControl(this.user.direccion, [
      ]),
      'idempresa': new FormControl(this.user.idempresa, [
      ]),
      'rol': new FormControl(this.user.rol, [
      ])
    },
      this.MatchPassword
    );
  }

  //https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
  MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('password2').value; // to get value in input tag
     if(password != confirmPassword) {
      AC.get('password2').setErrors( { notEqual: true } )
     } else {
      return null;
     }
  }

  save(){
    console.log(this.form.getRawValue());
    if(this.form.valid) {
      
      const updatedUser = this.UTILS.updateEntity(this.user, this.form.getRawValue());
      this.userService.save(updatedUser).toPromise()
        .then(
          (user: User)=>{
            this.snackBar.open("Usuario grabado", undefined, {
              duration: 2000,
            });
            this.user = user;
            this.router.navigate([`sos/settings/users/${this.user.id}`]);
          },
          (error: HttpErrorResponse)=>{
            this.UTILS.showErrDialog(error);
          }
      );
    }
    else {
      this.UTILS.showIncompleteFormDialog();
    }
  }

  delete(){
    this.UTILS.showDeletePrompt(new DeleteDialogData('usuario'))
      .then(
        (shallDelete) => {
          if(shallDelete){
            this.userService.delete(this.user.id).toPromise()
            .then(
              (user: User)=>{
                this.router.navigate([`sos/settings/users`]);
                this.snackBar.open("Usuario borrado", undefined, {
                  duration: 2000,
                });
              },
              (error: HttpErrorResponse)=>{
                console.error(error);
                this.UTILS.showErrDialog(error, "user");
              }
            );
          }
        },
        () => {
          console.log("FAILED -> delete");
        }
      );
  }

  goBack(){
    this.userResolver.user = undefined;
    this.router.navigate(['/sos/settings/users']);    
  }

  get login() { 
    return this.form.get('login');
  }

  get password() { 
    return this.form.get('password'); 
  }

  get password2() { 
    return this.form.get('password2');
  }

  get nombre() { 
    return this.form.get('nombre');
  }
  
  get apellido() { 
    return this.form.get('apellido');
  }

  get email() { 
    return this.form.get('email');
  }

  get telefono() { 
    return this.form.get('telefono');
  }

  get idrole() { 
    return this.form.get('idrole');
  }

  get direccion() { 
    return this.form.get('direccion');
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}