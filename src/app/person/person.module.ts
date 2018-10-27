import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PersonRoutingModule } from '@app/person/person-routing.module'
import { PersonListComponent } from '@app/person/components/person-list/person-list.component'
import { SharedModule } from '@app/shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
  ],
  declarations: [
    PersonListComponent
  ]
})
export class PersonModule { }
