import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SelectDivisionComponent } from './components/select-division/select-division.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PressEditComponent } from './components/press-edit/press-edit.component';

@NgModule({
  declarations: [
    SelectDivisionComponent,
    NavigationComponent,
    ConfirmDialogComponent,
    PressEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SelectDivisionComponent,
    NavigationComponent,
    PressEditComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
