import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentModule } from './document/document.module';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: 'document', loadChildren: () =>
    import('./document/document.module').then(mod => mod.DocumentModule)},
  // {path: '**', redirectTo: 'document'}
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'login.title'
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
