import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { OrderEditComponent } from './order-edit/order-edit.component';


const routes: Routes = [
  {path: 'order', component: OrderComponent, pathMatch: 'full', children: [
    {path: 'id/:id', component: OrderEditComponent}
  ]},
  {path: 'order/:id', component: OrderEditComponent},
  {path: '**', redirectTo: 'order'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
