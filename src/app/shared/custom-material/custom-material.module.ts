import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatToolbarModule, MatProgressBarModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatProgressBarModule
  ]
})
export class CustomMaterialModule { }
