import { PlanetService } from '@shared/services/planet.service'
import { MockPlanetService } from 'tests/mocks/planet.service'
import { NgModule } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import {
  PersonTableDeclarations, PersonTableProviders, PersonTableTestModules
} from '@app/shared/components/person-table/person-table.component.spec'
import { PlanetResidentListComponent } from './planet-resident-list.component'


@NgModule({
  exports: [
    PersonTableTestModules,
  ]
})
class PersonResidentListTestModules {}

describe('PlanetResidentListComponent', () => {
  let component: PlanetResidentListComponent
  let fixture: ComponentFixture<PlanetResidentListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PersonResidentListTestModules,
      ],
      declarations: [
        PlanetResidentListComponent,
        ...PersonTableDeclarations,
      ],
      providers: [
        ...PersonTableProviders,
        { provide: PlanetService, useClass: MockPlanetService },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetResidentListComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
