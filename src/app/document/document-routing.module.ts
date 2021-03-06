import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order/order.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { DashComponent } from './dash/dash.component';
import { AdrComponent } from './adr/adr.component';
import { TabComponent } from './tab/tab.component';
import { PaperComponent } from './paper/paper/paper.component';
import { PaperEditComponent } from './paper/paper-edit/paper-edit.component';
import { WorkComponent } from './work/work/work.component';
import { WorkEditComponent } from './work/work-edit/work-edit.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentEditComponent } from './equipment-edit/equipment-edit.component';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';
import { PrintPassportComponent } from './print/print-passport/print-passport.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';

const routes: Routes = [
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: ':id', component: OrderEditComponent, canDeactivate: [CanDeactivateGuard]}
  ]},
  {path: 'paper', children: [
    {path: '', component: PaperComponent},
    {path: ':id', component: PaperEditComponent}
  ]},
  {path: 'work', children: [
    {path: '', component: WorkComponent},
    {path: ':id', component: WorkEditComponent}
  ]},
  {path: 'equipment', children: [
    {path: '', component: EquipmentComponent},
    {path: ':id', component: EquipmentEditComponent}
  ]},
  { path: 'print', outlet: 'print', component: PrintLayoutComponent,
    children: [
      { path: 'passport/:id', component: PrintPassportComponent }
    ]
  },
  {path: 'dash', component: DashComponent},
  {path: 'adr', component: AdrComponent},
  {path: 'tab', component: TabComponent},
  // {path: 'order/:id', component: OrderEditComponent},
  {path: '**', redirectTo: 'order'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers: [CanComponentDeactivate]
})
export class DocumentRoutingModule { }
