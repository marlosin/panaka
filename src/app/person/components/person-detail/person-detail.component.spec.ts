import { NgModule } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatIconModule, MatCardModule, MatDividerModule, MatListModule } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { PersonDetailComponent } from './person-detail.component'

import { PlanetService } from '@shared/services/planet.service'
import { PersonService } from '@app/person/services/person.service'

import { MockPlanetService } from 'tests/mocks/planet.service'
import { MockPersonService } from 'tests/mocks/person.service'
import { MockActivatedRoute } from 'tests/mocks/activated-route'

@NgModule({
  exports: [
    NoopAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ]
})
class PersonTableTestModules {}

const PersonDetailDeclarations = [
  PersonDetailComponent,
]

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent
  let fixture: ComponentFixture<PersonDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PersonTableTestModules,
      ],
      declarations: PersonDetailDeclarations,
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: PersonService, useClass: MockPersonService },
        { provide: PlanetService, useClass: MockPlanetService },
        { provide: Router, useValue: { navigate() {} } },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailComponent)
    component = fixture.componentInstance
  })

  it('should create', fakeAsync(() => {
    fixture.detectChanges()

    tick()
    expect(component).toBeTruthy()
  }))
})
