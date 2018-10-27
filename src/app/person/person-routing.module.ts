import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PersonListComponent } from '@app/person/components/person-list/person-list.component'

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
  },
  {
    path: ':id',
    component: PersonDetailComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
