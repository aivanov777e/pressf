import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { DashComponent } from './dash/dash.component';
import { AdrComponent } from './adr/adr.component';
import { TabComponent } from './tab/tab.component';


const routes: Routes = [
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: ':id', component: OrderEditComponent}
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
