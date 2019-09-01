import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { SelectDivisionComponent } from './select-division/select-division.component';

@NgModule({
  declarations: [
    SelectDivisionComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    // CustomMaterialModule,
    SelectDivisionComponent,
  ]
})
export class SharedModule { }
