import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptorService extends HttpErrorResponse {
  constructor(private toastrService: ToastrService) {
    super(toastrService);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMesagge = '';
        let errorType = '';

        if (httpErrorResponse.error instanceof ErrorEvent) {
          errorMesagge = httpErrorResponse.error.error;
        } else {
          errorType = $localize`:{server_error}:Error del lado del servidor`;
          if (httpErrorResponse.status === 0) {
            errorMesagge = $localize`:{no_conection}:No hay conexión con el servidor`;
          } else {
            errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`;
          }
          this.toastrService.error(errorMesagge, errorType, {
            closeButton: true,
          });
        }
        return throwError(() => new Error(errorMesagge));
      })
    );
  }
}
