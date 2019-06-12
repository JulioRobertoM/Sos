import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginComponent } from './page-login.component';
import { MatIconModule, MatFormFieldModule, MatProgressSpinnerModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatCardModule, MatInputModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PageLoginComponent', () => {
  let component: PageLoginComponent;
  let fixture: ComponentFixture<PageLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientModule, BrowserAnimationsModule,
                 MatCardModule, MatIconModule, ReactiveFormsModule, 
                 MatFormFieldModule, MatProgressSpinnerModule, FormsModule, MatInputModule,
                 MatDialogModule
               ],
      declarations: [ PageLoginComponent ],
      providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
