import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: 'people',
    loadChildren: './person/person.module#PersonModule',
  },
  {
    path: 'planets',
    loadChildren: './planet/planet.module#PlanetModule',
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
