import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashComponent } from './dash/dash.component';
import { TabComponent } from './tab/tab.component';
import { AdrComponent } from './adr/adr.component';
import { PaperComponent } from './paper/paper.component';
import { PaperEditComponent } from './paper-edit/paper-edit.component';
import { PaperPriceEditComponent } from './paper-price-edit/paper-price-edit.component';
import { WorkTypeComponent } from './work-type/work-type.component';
import { WorkTypeEditComponent } from './work-type-edit/work-type-edit.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderEditComponent,
    DashComponent,
    TabComponent,
    AdrComponent,
    PaperComponent,
    PaperEditComponent,
    PaperPriceEditComponent,
    WorkTypeComponent,
    WorkTypeEditComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    PaperPriceEditComponent
  ]
})
export class DocumentModule { }
