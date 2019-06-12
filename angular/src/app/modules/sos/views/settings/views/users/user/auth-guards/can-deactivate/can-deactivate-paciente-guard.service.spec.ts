import { TestBed, inject } from '@angular/core/testing';

import { CanDeactivateUserGuard } from './can-deactivate-paciente-guard.service';

describe('CanDeactivateUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateUserGuard]
    });
  });

  it('should be created', inject([CanDeactivateUserGuard], (service: CanDeactivateUserGuard) => {
    expect(service).toBeTruthy();
  }));
});
