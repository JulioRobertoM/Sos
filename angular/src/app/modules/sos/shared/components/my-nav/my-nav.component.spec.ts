
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNavComponent } from './my-nav.component';
import { MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MyNavComponent', () => {
  let component: MyNavComponent;
  let fixture: ComponentFixture<MyNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, 
                 BrowserAnimationsModule ],
      declarations: [ MyNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
