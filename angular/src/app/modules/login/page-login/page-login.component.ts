import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../sos/shared/services/global/global.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  public user: any = {
    username: '',
    password: ''
  };

  public captchaSolved = true;

  public isDisabled = false;

  loginFailed = true;

  form: FormGroup;

  constructor(private router: Router, public dialog: MatDialog, 
              private http: HttpClient, private globalService: GlobalService) {
    this.createForm();
  }

  ngOnInit() {}

  resolved(captchaResponse: object) {
    if(captchaResponse!=null){
      this.captchaSolved = true;
    }
  }

  formHasError(){
    return (this.usernameFormControl.hasError('required') || 
           this.passwordFormControl.hasError('required')
           || !this.captchaSolved 
          );
  }

  createForm() {
    this.form = new FormGroup({
      'username': new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      'password': new FormControl(this.user.password, [
        Validators.required
      ])});
  }  

  sendInformation() {

    this.isDisabled = true;

    this.http.post(
        `${this.globalService.serverURI}/users/getSession`,
        //{ data: { usuario } }
        { 
          username: this.form.getRawValue().username, 
          password: this.form.getRawValue().password
        },
      ).subscribe((session : any) => {
        this.globalService.setSession(session);
        this.router.navigate(['/sos']);
      },
      (err) =>{

        this.dialog.open(DialogAlertComponent, {
            width: '380px',
            data: err
          }).afterClosed().toPromise().then((exc)=>{
        });

        //alert(err);
        this.isDisabled = false;
        this.loginFailed = true;
      }
    );

  }

  get username() { 
    return this.form.get('username');
  }

  get password() { 
    return this.form.get('password'); 
  }  

}