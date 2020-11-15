import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    //private auth: AuthService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error, caught) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    // let mes = error.error.message ? error.error.message : JSON.stringify(error.error);
    // let mes = error.status ? JSON.stringify(error.error) : error.message;
    // let mes = error.message;
    //let mes = (error.error && (error.error.message || JSON.stringify(error.error))) || error.message;
    let mes = (error.error && error.error.message) || error.message;

    switch (error.status) {
      case 401: {
        mes = 'Access denied';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authData');
        //this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});

        //mes = error.error;
        //this.auth.logout();
        this.router.navigate([`/login`]);
        break;
      }
      case 404: {
        mes = `Ошибка, данные не найдены. ${mes}`;
        break;
      }
      case 409: {
        mes = `Ошибка, конфликт версий данных, пожалуйста обновите страницу. ${mes}`;
        break;
      }
      case 503: {
        mes = `Ошибка соединения с сервером. ${mes}`;
        break;
      }
    }

    if (mes) {
      this.snackbarService.openSnackBar(mes, 'red-snackbar');
    }
  }
}
