import { PersonDetailComponent } from './components/person-detail/person-detail.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PersonTableComponent } from '@app/shared/components/person-table/person-table.component'

const routes: Routes = [
  {
    path: '',
    component: PersonTableComponent,
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
