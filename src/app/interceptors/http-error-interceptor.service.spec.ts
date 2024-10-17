import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { ToastrModule } from 'ngx-toastr';

describe('HttpErrorInterceptorService', () => {
  let service: HttpErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [HttpErrorInterceptorService],
    });
    service = TestBed.inject(HttpErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
