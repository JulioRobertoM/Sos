import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { User } from '../../../../../../shared/models/User';
import { GlobalService } from '../../../../../../shared/services/global/global.service';
import { UserService } from '../../../../../../shared/services/user/user.service';
import { UTILSService } from '../../../../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  dataErr : HttpErrorResponse;
  errMsg : ErrMsg;

  form: FormGroup;
  foreignDependency: string;
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User },
              private UTILS: UTILSService,
              private globalService : GlobalService,
              public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private userService : UserService,
              private snackBar: MatSnackBar) {

    this.user = data.user;
    this.createForm();

  }

  ngOnInit(){ }

  createForm() {
    this.form = new FormGroup({
      'login': new FormControl(this.user.login, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      'password': new FormControl(undefined, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      'password2': new FormControl(undefined, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
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
    console.log('L:'+this.login);
    if(this.form.valid) {
      this.user.password = this.form.get('password').value;
      this.userService.save(this.user).toPromise()
        .then(
          (user: User)=>{
            this.snackBar.open("Contraseña actualizada", undefined, {
              duration: 2000,
            });
            this.user = user;
            this.globalService.user = user;
            this.dialogRef.close({});
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

  close(){
    this.dialogRef.close({});
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

}

class ErrMsg {

  type: "Default" | "SequelizeForeignKeyConstraintError";
  entity: string;
  errMsg: string;

  constructor(type){
    this.type = type;
  }

}