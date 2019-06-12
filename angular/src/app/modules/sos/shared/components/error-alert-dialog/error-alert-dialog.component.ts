import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-alert-dialog',
  templateUrl: './error-alert-dialog.component.html',
  styleUrls: ['./error-alert-dialog.component.css']
})

//Cannot delete or update a parent row: a foreign key constraint fails (`arcs`.`
export class ErrorAlertDialogComponent implements OnInit {

  dataErr : HttpErrorResponse;
  errMsg : ErrMsg;

  foreignDependency: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { httpErrorResponse: HttpErrorResponse, entity: string }) {

    this.dataErr = data.httpErrorResponse;

    /*if(this.dataErr.error.name === "SequelizeForeignKeyConstraintError"){
      this.errMsg = new ErrMsg("SequelizeForeignKeyConstraintError");
      this.errMsg.entity = this.data.entity ? this.data.entity : "information";

      //79 - Cannot delete or update a parent row: a foreign key constraint fails (`arcs`.`
      const index = this.dataErr.error.message.indexOf("`", 79);
      this.foreignDependency = this.dataErr.error.message.substring(78, index);
    }
    else {
    }*/
  }

  ngOnInit(){ }

}

class ErrMsg {

  type: "Default" | "SequelizeForeignKeyConstraintError";
  entity: string;
  errMsg: string;

  constructor(type){
    this.type = type;
  }

}