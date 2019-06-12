import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomQuillComponent } from './custom-quill.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { QuillModule } from 'ngx-quill';

describe('CustomQuillComponent', () => {
  let component: CustomQuillComponent;
  let fixture: ComponentFixture<CustomQuillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatIconModule, QuillModule ],
      declarations: [ CustomQuillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQuillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
