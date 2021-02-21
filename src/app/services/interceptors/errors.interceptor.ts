import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(evt => {
          if (evt instanceof HttpResponse &&evt.body && evt.body.msg)
                  this.toastrService.success(evt.body.msg, '', { positionClass: 'toast-bottom-right' });
          
      }),
      catchError((err) => {
          if(err instanceof HttpErrorResponse) {
            try {
                this.toastrService.error(err.error.msg, '', { positionClass: 'toast-bottom-right' });
              } catch(e) {
                  this.toastrService.error('An error occurred', '', { positionClass: 'toast-bottom-right'});
              }
          }
          return of(err);
      }));


  }
}
