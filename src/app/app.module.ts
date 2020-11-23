import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DocumentModule } from './document/document.module';
import { CoreModule } from './core/core.module';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingStateInterceptor } from './core/interceptors/loading-state.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CanDeactivateGuard } from './core/guards/can-deactivate.guard';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    DocumentModule,
  ],
  exports: [
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    // { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingStateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CanDeactivateGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic(
// // [{provide: LOCALE_ID, useValue: 'en-EN'}]
// ).bootstrapModule(AppModule, {
//   providers: [{provide: LOCALE_ID, useValue: 'ru' }]
// });
