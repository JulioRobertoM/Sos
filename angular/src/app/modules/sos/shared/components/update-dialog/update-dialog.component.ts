import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export class UpdateDialogData {
  component: string;
  constructor(component){
    this.component = component;
  }
}

@Component({
  selector: 'update-dialog',
  templateUrl: './update-dialog.html',
  styleUrls: ['./update-dialog.css']
})
export class UpdateDialogComponent {

  component;

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData) {
    this.component = data.component;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}