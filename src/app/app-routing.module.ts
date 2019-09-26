import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: 'people',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
  },
  {
    path: 'planets',
    loadChildren: () => import('./planet/planet.module').then(m => m.PlanetModule),
  },
  {
    path: '**',
    redirectTo: 'people'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
