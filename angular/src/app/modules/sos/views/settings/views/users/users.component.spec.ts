import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { MatIconModule, MatOptionModule, MatSelectModule, MatPaginatorModule, MatTableModule, MatInputModule, MatProgressBarModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersResolver } from './users.resolver';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../shared/services/user/user.service';
import { UserResolver } from './user/user.resolver';
import { UTILSService } from '../../shared/services/utils/utils.service';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('UsuariosComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        InfiniteScrollModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        FlexLayoutModule
      ],
      declarations: [ 
        UsersComponent
      ],
      providers: [
        UsersResolver,
        UserResolver,
        UserService,
        UTILSService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
