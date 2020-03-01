import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { OrderComponent } from './order/order/order.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashComponent } from './dash/dash.component';
import { TabComponent } from './tab/tab.component';
import { AdrComponent } from './adr/adr.component';
import { PaperComponent } from './paper/paper/paper.component';
import { PaperEditComponent } from './paper/paper-edit/paper-edit.component';
import { PaperPriceEditComponent } from './paper/paper-price-edit/paper-price-edit.component';
import { WorkComponent } from './work/work/work.component';
import { WorkEditComponent } from './work/work-edit/work-edit.component';
import { WorkPriceEditComponent } from './work/work-price-edit/work-price-edit.component';
import { EquipmentEditComponent } from './equipment-edit/equipment-edit.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { OrderPostPressEditComponent } from './order/order-post-press-edit/order-post-press-edit.component';
import { PaperEditDialogComponent } from './paper/paper-edit-dialog/paper-edit-dialog.component';
import { OrderPressEditComponent } from './order/order-press-edit/order-press-edit.component';

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
    WorkComponent,
    WorkEditComponent,
    WorkPriceEditComponent,
    EquipmentEditComponent,
    EquipmentComponent,
    OrderPostPressEditComponent,
    PaperEditDialogComponent,
    OrderPressEditComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    PaperPriceEditComponent,
    WorkPriceEditComponent,
    PaperEditDialogComponent,
  ]
})
export class DocumentModule { }
