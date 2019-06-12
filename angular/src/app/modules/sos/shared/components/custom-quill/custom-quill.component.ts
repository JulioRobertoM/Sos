import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-quill',
  templateUrl: './custom-quill.component.html',
  styleUrls: ['./custom-quill.component.scss']
})

export class CustomQuillComponent implements OnInit {

  @Input() mdNgModel : any;
  @Input() customBtns : Array<CustomBtnQuill> = [];
  @Input() customBtnsData : any;

  @Output() onKeyUp : EventEmitter<any> = new EventEmitter<any>();
  @Output() mdNgModelChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  triggerOnKeyUp(){
    this.onKeyUp.emit(this.mdNgModel);
  }

  emitChange(){
    this.mdNgModelChange.emit(this.mdNgModel);
  }

}

export class CustomBtnQuill {
  constructor(
    public title : string,
    public icon  : string,
    public onClick : (any)=>void 
  ) {}
}