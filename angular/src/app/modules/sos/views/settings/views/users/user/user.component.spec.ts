import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatCardModule, MatSelectModule, MatDividerModule, MatTableModule, MatPaginatorModule, MatInputModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatSnackBar } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UTILSService } from '../../../shared/services/utils/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { UserResolver } from './user.resolver';
import { UserService } from '../../../shared/services/user/user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        MatIconModule, 
        MatCardModule, 
        MatSelectModule, 
        MatDividerModule,        
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatInputModule, 
        BrowserAnimationsModule,
        MatDatepickerModule, 
        MatNativeDateModule, 
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ UserComponent ],
      providers: [
        UTILSService,
        UserResolver,
        UserService,
        MatSnackBar
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'))
    el = de.nativeElement;
  });

  //https://medium.com/frontend-fun/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});