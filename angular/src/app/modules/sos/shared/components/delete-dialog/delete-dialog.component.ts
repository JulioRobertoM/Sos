import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export class DeleteDialogData {
  component: string;
  constructor(component){
    this.component = component;
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.html',
  styleUrls: ['./delete-dialog.css']
})
export class DeleteDialogComponent {

  component;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
    this.component = data.component;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}