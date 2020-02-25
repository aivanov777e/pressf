import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { LoadingStateService } from '../services/loading-state.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateInterceptor implements HttpInterceptor {

  constructor(
    private loadingStateService: LoadingStateService,
    private snackbarService: SnackbarService,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingStateService.start();

    return next.handle(req).pipe(
      catchError((error, caught) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => this.loadingStateService.end())
    );


    // return next.handle(req).pipe(tap(
    //   (event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       this.loadingStateService.end();
    //   }},
    //   (err: any) => {
    //       this.loadingStateService.end();
    //   },
    //   () => this.loadingStateService.end()
    // ));
  }

  private handleError(error: HttpErrorResponse) {
    // let mes = error.error.message ? error.error.message : JSON.stringify(error.error);
    // let mes = error.status ? JSON.stringify(error.error) : error.message;
    // let mes = error.message;
    let mes = (error.error && (error.error.message || JSON.stringify(error.error))) || error.message;

    // switch (error.status) {
    //   case 401: {
    //     mes = error.error;
    //     this.auth.logout();
    //     this.router.navigate([`/login`]);
    //     break;
    //   }
    //   case 404: {
    //     mes = `Ошибка, данные не найдены. ${mes}`;
    //     break;
    //   }
    //   case 409: {
    //     mes = `Ошибка, конфликт версий данных, пожалуйста обновите страницу. ${mes}`;
    //     break;
    //   }
    //   case 503: {
    //     mes = `Ошибка соединения с сервером. ${mes}`;
    //     break;
    //   }
    // }

    if (mes) {
      this.snackbarService.openSnackBar(mes, 'red-snackbar');
    }
  }

}
