import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module';
import { PersonRoutingModule } from '@person/person-routing.module'

import { PersonListComponent } from '@person/components/person-list/person-list.component'
import { PersonDetailComponent } from '@person/components/person-detail/person-detail.component'

@NgModule({
  imports: [
    PersonRoutingModule,
    SharedModule,
  ],
  declarations: [
    PersonListComponent,
    PersonDetailComponent,
  ]
})
export class PersonModule { }
