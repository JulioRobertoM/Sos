import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSort, MatTableDataSource, MatSortable } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { SOS } from 'src/app/modules/sos/shared/models/SOS';
import { User } from 'src/app/modules/sos/shared/models/User';
import { SOSService } from 'src/app/modules/sos/shared/services/sos/sos.service';
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { GeneralResolver } from 'src/app/modules/sos/views/settings/views/generals/generals-resolver.service';

@Component({
  selector: 'app-settings-generals',
  templateUrl: './generals.component.html'
})

export class GeneralsComponent implements OnInit {

  form: FormGroup;
  SOS: SOS;

  user: User;
  constructor(private smsService: SOSService,
              private sosResolver: GeneralResolver,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog,
              private http: HttpClient,
              public activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private UTILS: UTILSService) {

    this.SOS = this.sosResolver.SOS;
  }

  ngOnInit() {
    this.createForm();
    this.globalService.getUser().then(user => {
      this.user = user;
    });
  }

  createForm() {

    this.form = new FormGroup({
      'tm': new FormControl(this.SOS.tm, [
        Validators.required,
        Validators.maxLength(10)
      ]),
      'prefijo': new FormControl(this.SOS.prefijo, [
        Validators.required,
        Validators.maxLength(10)
      ]),
      'consecutivo': new FormControl(this.SOS.consecutivo, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999)
      ]),
      'pagenumber': new FormControl(this.SOS.pagenumber,[
        Validators.required,
        Validators.min(1),
        Validators.max(999)
      ]),
    });
  }

  onSubmit(){

    if(this.form.valid) {
      const updatedSOS = this.UTILS.updateEntity(this.SOS, this.form.getRawValue());    
      this.smsService.save(updatedSOS).toPromise()
        .then(
          (sms: SOS)=>{
            this.snackBar.open("Configuración guardada", undefined, {
              duration: 2000,
            });
            this.SOS = sms;
            this.router.navigate(['/sos/settings']);
          },
          (error: HttpErrorResponse)=>{
            console.error(error);
            this.UTILS.showErrDialog(error);
          }
      );
    }
    else{
      this.UTILS.showIncompleteFormDialog();
    }
  }

  onScroll(){

  }
  
  goBack(){
    this.sosResolver.SOS = undefined;
    this.router.navigate(['/sos/settings']);    
  }

  get tm() {
    return this.form.get('tm');
  }

  get prefijo() {
    return this.form.get('prefijo');
  }

  get consecutivo() {
    return this.form.get('consecutivo');
  }

  get pagenumber() {
    return this.form.get('pagenumber');
  }

}
