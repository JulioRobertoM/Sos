import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export enum MdInputType{
    text = 1,
    select = 2,
    date = 3,
    autocomplete = 4,
}

export function onModelChange($event:any,parent_object:any):void{
  parent_object = $event;
}

@Component({
  selector: 'md-input',
  templateUrl: './md-input.component.html',
  styleUrls: ['./md-input.component.scss']
})
export class MdInputComponent implements OnInit {

  @Input() mdNgModel : any;
  @Input() mdPlaceholder : string;
  @Input() mdformControlName : string;
  @Input() mdGroup: FormGroup;
  @Input() mdInputType : MdInputType;
  @Input() mdValueType = 'id';
  @Input() mdItemOptions : any[];
  @Input() mdDescriptionModel = ["descripcion"];
  @Input() showMsgErrors : boolean = true;

  @Output() mdNgModelChange = new EventEmitter<any>();

  MdInputType = MdInputType;
  filteredOptions: Observable<any[]>;

  constructor() {
  }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith<string | User>(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this.filter(name) : this.options.slice())
    //   );
  }

  hasError(errorType:string):boolean{
    return this.mdGroup.controls[this.mdformControlName].hasError(errorType);
  }

  printObject(object:any):string{
    let returnString = "";
    for(let prop of this.mdDescriptionModel){
      returnString = returnString + object[prop] + " ";
    }
    return returnString;
  }

  emitChange(){
    this.mdNgModelChange.emit(this.mdNgModel);
  }
}