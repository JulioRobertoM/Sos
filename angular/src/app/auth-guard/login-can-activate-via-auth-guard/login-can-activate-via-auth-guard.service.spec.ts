import { TestBed, inject } from '@angular/core/testing';

import { LoginCanActivateViaAuthGuard } from './login-can-activate-via-auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginCanActivateViaAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ LoginCanActivateViaAuthGuard ]
    });
  });

  it('should be created', inject([LoginCanActivateViaAuthGuard], (service: LoginCanActivateViaAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
