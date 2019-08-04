import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentModule } from './feature/document/document.module';


const routes: Routes = [
  {path: 'document', loadChildren: () =>
    import('./feature/document/document.module').then(mod => mod.DocumentModule)},
  {path: '**', redirectTo: 'document'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
