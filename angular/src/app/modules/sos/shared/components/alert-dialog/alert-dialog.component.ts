import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  alertConfigDialog : AlertConfigDialog;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertConfigDialog) {
    this.alertConfigDialog = data;
  }

  ngOnInit() { }

}

export class AlertConfigDialog {
  title: string;
  content: string;
  constructor(
    title: string,
    content: string
  ){
    this.title = title;
    this.content = content;
  }
}