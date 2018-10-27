import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PersonListComponent } from '@app/person/components/person-list/person-list.component'

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
