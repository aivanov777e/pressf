import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrderComponent,
    OrderEditComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule,
  ]
})
export class DocumentModule { }
