import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingStateService } from '../services/loading-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateInterceptor implements HttpInterceptor {

  constructor(private loadingStateService: LoadingStateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingStateService.start();

    return next.handle(req).pipe(
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
}
