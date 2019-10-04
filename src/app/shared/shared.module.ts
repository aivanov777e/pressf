import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SelectDivisionComponent } from './select-division/select-division.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    SelectDivisionComponent,
    NavigationComponent,
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
  ]
})
export class SharedModule { }
