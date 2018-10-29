import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'
import { PersonRoutingModule } from '@person/person-routing.module'

import { PersonDetailComponent } from '@person/components/person-detail/person-detail.component'

@NgModule({
  imports: [
    PersonRoutingModule,
    SharedModule,
  ],
  declarations: [
    PersonDetailComponent,
  ]
})
export class PersonModule { }
