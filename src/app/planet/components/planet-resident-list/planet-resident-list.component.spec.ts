import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PlanetResidentListComponent } from './planet-resident-list.component'

describe('PlanetResidentListComponent', () => {
  let component: PlanetResidentListComponent
  let fixture: ComponentFixture<PlanetResidentListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetResidentListComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetResidentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
