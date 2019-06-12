import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorAlertDialogComponent } from './error-alert-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ErrorAlertDialogComponent', () => {
  let component: ErrorAlertDialogComponent;
  let fixture: ComponentFixture<ErrorAlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [ 
        ErrorAlertDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { error: { name: "Delete", message: "MessageTest" } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
