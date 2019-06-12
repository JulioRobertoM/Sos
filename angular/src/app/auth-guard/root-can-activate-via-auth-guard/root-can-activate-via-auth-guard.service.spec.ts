import { TestBed, inject } from '@angular/core/testing';

import { RootCanActivateViaAuthGuard } from './root-can-activate-via-auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RootCanActivateViaAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ RootCanActivateViaAuthGuard ]
    });
  });

  it('should be created', inject([RootCanActivateViaAuthGuard], (service: RootCanActivateViaAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
