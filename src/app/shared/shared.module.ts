import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SelectDivisionComponent } from './select-division/select-division.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectDivisionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ],
  exports: [
    // CustomMaterialModule,
    SelectDivisionComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ]
})
export class SharedModule { }
