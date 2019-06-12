import { TestBed, inject } from '@angular/core/testing';

import { CanActivateViaAuthGuard } from './can-activate-via-auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CanActivateViaAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ CanActivateViaAuthGuard ]
    });
  });

  it('should be created', inject([CanActivateViaAuthGuard], (service: CanActivateViaAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
