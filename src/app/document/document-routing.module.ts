import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { DashComponent } from './dash/dash.component';
import { AdrComponent } from './adr/adr.component';
import { TabComponent } from './tab/tab.component';
import { PaperComponent } from './paper/paper.component';
import { PaperEditComponent } from './paper-edit/paper-edit.component';
import { WorkTypeComponent } from './work-type/work-type.component';
import { WorkTypeEditComponent } from './work-type-edit/work-type-edit.component';


const routes: Routes = [
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: ':id', component: OrderEditComponent}
  ]},
  {path: 'paper', children: [
    {path: '', component: PaperComponent},
    {path: ':id', component: PaperEditComponent}
  ]},
  {path: 'work-type', children: [
    {path: '', component: WorkTypeComponent},
    {path: ':id', component: WorkTypeEditComponent}
  ]},
  {path: 'dash', component: DashComponent},
  {path: 'adr', component: AdrComponent},
  {path: 'tab', component: TabComponent},
  // {path: 'order/:id', component: OrderEditComponent},
  {path: '**', redirectTo: 'order'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
