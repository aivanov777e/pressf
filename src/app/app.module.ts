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
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    DocumentModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic(
// // [{provide: LOCALE_ID, useValue: 'en-EN'}]
// ).bootstrapModule(AppModule, {
//   providers: [{provide: LOCALE_ID, useValue: 'ru' }]
// });
