import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogData } from 'src/app/modules/sos/shared/components/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { Referencias } from 'src/app/modules/sos/shared/models/Referencias';
import { ReferenciaService } from 'src/app/modules/sos/shared/services/referencias/referencias.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { ReferenciasResolver } from 'src/app/modules/sos/views/referencias/referencia/referencia.resolver';
import { UpdateDialogData } from 'src/app/modules/sos/shared/components/update-dialog/update-dialog.component';

export interface PeriodicElement {
  file: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {file: 'COD123', date: '19/02/2018'},
  {file: 'COD456', date: '12/08/2018'},
  {file: 'COD789', date: '09/05/2018'},
  {file: 'COD999', date: '23/04/2018'}
];

@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styleUrls: ['./referencia.component.css'],
  animations: [
    trigger('banished', [
      state('yes', style({ opacity: 0.25})),
      state('no', style({ opacity: 1})),
      transition('yes <=> no', animate('0.2s 225ms ease-in'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ opacity: 0, height: '0px', minHeight: '0px', display: 'none' })),
      state('expanded', style({ opacity: 1, visibility: 'visible' })),
      transition('expanded => collapsed', animate('0.5s 1ms ease-out')),
      transition('collapsed => expanded', animate('1s 100ms ease-out')),
    ]),
  ],
})
export class ReferenciaComponent implements OnInit {

  form: FormGroup;
  referencia: Referencias;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private UTILS: UTILSService,
              private pedidoResolver: ReferenciasResolver,
              private referenciaService: ReferenciaService,
              private router : Router,
              private snackBar: MatSnackBar) {

    this.referencia = this.pedidoResolver.referencia ? this.pedidoResolver.referencia : new Referencias();
    //this.user = this.sosUser.getUsers();  

    if(!this.referencia.id){

    }

    this.createForm();
    
    if (!this.referencia.id){
      const today = new Date();
      const horaActual = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    }  
  }

  ngOnInit() {
    //this.getpedidoxx();
  }

  createForm() {
    this.form = new FormGroup({
      'codr': new FormControl({value: this.referencia.codr, disabled: false}, [
        Validators.required,
      ]),
      'descr': new FormControl({value: this.referencia.descr, disabled: false}, [
        Validators.required,
      ]),
      'unid': new FormControl({value: this.referencia.unid, disabled: false}, [
        Validators.required,
      ]),
      'comentario': new FormControl({value: this.referencia.comentario, disabled: false}, [
        Validators.required,
      ]),
    },
    );
  }

  save(){
    console.log(this.form.getRawValue());
    if(this.form.valid) {
      
      const updatedUser = this.UTILS.updateEntity(this.referencia, this.form.getRawValue());
      this.referenciaService.save(updatedUser).toPromise()
        .then(
          (referencia: Referencias)=>{
            this.snackBar.open("Referencia grabada", undefined, {
              duration: 2000,
            });
            this.referencia = referencia;
            //this.router.navigate([`sos/referencias/${this.referencia.id}`]);
            this.router.navigate([`sos/referencias`]);
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
    this.UTILS.showDeletePrompt(new DeleteDialogData('referencia'))
      .then(
        (shallDelete) => {
          if(shallDelete){
            this.referenciaService.delete(this.referencia.id).toPromise()
            .then(
              (referencia: Referencias)=>{
                this.router.navigate([`sos/referencias`]);
                this.snackBar.open("Referencia anulada", undefined, {
                  duration: 2000,
                });
              },
              (error: HttpErrorResponse)=>{
                console.error(error);
                this.UTILS.showErrDialog(error, "referencia");
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
    this.pedidoResolver.referencia = undefined;
    this.router.navigate(['/sos/referencias']);    
  }

  get codr() { 
    return this.form.get('codr');
  }

  get descr() { 
    return this.form.get('descr');
  }

  get unid() { 
    return this.form.get('unid');
  }

  get comentario() { 
    return this.form.get('comentario');
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}