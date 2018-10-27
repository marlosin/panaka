import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'

import { PlanetRoutingModule } from './planet-routing.module'
import { PlanetResidentListComponent } from './components/planet-resident-list/planet-resident-list.component'

@NgModule({
  imports: [
    PlanetRoutingModule,
    SharedModule,
  ],
  declarations: [
    PlanetResidentListComponent,
  ]
})
export class PlanetModule { }
