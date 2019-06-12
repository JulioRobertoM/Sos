import { Injectable } from '@angular/core';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { path } from 'ramda';
import { cloneDeep } from 'lodash';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorAlertDialogComponent } from '../../components/error-alert-dialog/error-alert-dialog.component';
import { DeleteDialogComponent, DeleteDialogData } from '../../components/delete-dialog/delete-dialog.component';
import { AlertConfigDialog, AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { UpdateDialogComponent, UpdateDialogData } from 'src/app/modules/sos/shared/components/update-dialog/update-dialog.component';

@Injectable()
export class UTILSService {

  static serverURI = 'http://127.0.0.1:8080';

  constructor(private dialog: MatDialog) { }

  getFilteredAutocomplete(formControl : FormControl, observable : Observable<any>, prop : string){
    return formControl.valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(obj => {
          let val = obj || '';
          return observable
            .pipe(
              map(response => response.filter(option => {
                return option[prop].toLowerCase().indexOf((typeof val === 'string' ? val : val[prop]).toLowerCase()) === 0
              }))
            )
        })
      );
  }

  applyFilterToTable(filterValue, dataSource : MatTableDataSource<any> | null){

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches string.indexOf(substring) !== -1;
    dataSource.filter = filterValue;

  }

  updateEntity(entity: any, updateTo: JSON) : any{
    for (var key in updateTo) {
      if (updateTo.hasOwnProperty(key)) {
        entity[key] = cloneDeep(updateTo[key]);
      }
    }
    return entity;
  }

  showAlertDialog(alertConfigDialog: AlertConfigDialog){
    return this.dialog.open(AlertDialogComponent, {
        width: '380px',
        data: alertConfigDialog
      })
  }

  showErrDialog(httpErrorResponse: HttpErrorResponse, entity?: string){
    this.dialog.open(ErrorAlertDialogComponent, {
        width: '380px',
        data: {
          httpErrorResponse,
          entity
        }
      }).afterClosed().toPromise().then((exc)=>{
    })
  }

  showIncompleteFormDialog() : Promise<any> {
    const data = new AlertConfigDialog("Pedidos Web", "Hay algunos campos NO válidos en tu formulario.");
    return this.dialog.open(AlertDialogComponent, {
      width: '380px',
      data
    }).afterClosed().toPromise();
  }

  showMensajesSms(mensaje: string) : Promise<any>{
    const data = new AlertConfigDialog("Pedidos Web", mensaje);
    return this.dialog.open(AlertDialogComponent, {
       width: '400px',
       data
     }).afterClosed().toPromise();
  }
  // showIncompleteFormPrompt(data: DeleteDialogData) {
  //   return this.dialog.open(DeleteDialogComponent, {
  //     width: '380px',
  //     data
  //   }).afterClosed().toPromise();
  // }

  showDeletePrompt(data: DeleteDialogData) {
    return this.dialog.open(DeleteDialogComponent, {
      width: '380px',
      data
    }).afterClosed().toPromise();
  }

  showUpdatePrompt(data: UpdateDialogData) {
    return this.dialog.open(UpdateDialogComponent, {
      width: '380px',
      data
    }).afterClosed().toPromise();
  }

  removeFromList(array: any[], obj: any, ){
    const index = array.findIndex((item) => item.id === obj.id);
    array.splice(index, 1);
    return array;
  }

  //AUTOCOMPLETE VALIDATORS
  
  //PERFECT MATCH
  autocompleteMatchValidator(control: FormControl) {
    let selection = control.value;
    if(selection){
      if (typeof selection === 'string') {
        return { noMatch: {} }
      }
    }
    return null;
  }

  getFilterPredicate(filterBy: { name, path }){
    return (any: any, filter: string) => {
      const strings = filterBy.path.split(".");
      return String(path(strings)(any)).toLowerCase().trim().indexOf(filter) !== -1;
    };    
  }

}