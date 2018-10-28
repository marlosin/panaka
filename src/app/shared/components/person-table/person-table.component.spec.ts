import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PersonTableComponent } from './person-table.component'

export const PersonTableDeclarations = [
  PersonTableComponent,
]

describe('PersonTableComponent', () => {
  let component: PersonTableComponent
  let fixture: ComponentFixture<PersonTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: PersonTableDeclarations
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
