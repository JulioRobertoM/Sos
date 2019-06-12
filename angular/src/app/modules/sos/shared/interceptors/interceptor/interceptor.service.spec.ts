import { TestBed, inject } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ InterceptorService ]
    });
  });

  it('should be created', inject([InterceptorService], (service: InterceptorService, router: Router) => {
    expect(service).toBeTruthy();
  }));
});
