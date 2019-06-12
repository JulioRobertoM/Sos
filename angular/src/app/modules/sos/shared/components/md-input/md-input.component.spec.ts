import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdInputComponent } from './md-input.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';
import { FormGroup } from '@angular/forms';

describe('MdInputComponent', () => {
  let component: MdInputComponent;
  let fixture: ComponentFixture<MdInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdInputComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatAutocompleteModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdInputComponent);
    component = fixture.componentInstance;
    component.mdGroup = new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
    component.mdformControlName = "nombres";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
