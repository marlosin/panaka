import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppMaterialModule } from '@app/app-material.module'
import { PersonTableComponent } from '@shared/components/person-table/person-table.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
  ],
  declarations: [
    PersonTableComponent,
  ],
  exports: [
    PersonTableComponent,
    CommonModule,
    AppMaterialModule,
  ]
})
export class SharedModule { }
