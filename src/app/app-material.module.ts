import { LayoutModule } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatPaginatorModule, MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTableModule,
    CdkTableModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class AppMaterialModule { }
