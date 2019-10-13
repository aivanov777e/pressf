import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading-service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.start();

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.loadingService.end();
      }
    },
      (err: any) => {
        this.loadingService.end();
    }));
  }
}
