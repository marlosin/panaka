import { DebugElement, NgModule } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PersonTableComponent } from './person-table.component'

import { StatusService } from '@app/shared/services/status.service'
import { PersonService } from '@app/person/services/person.service'

import { MockPersonService } from 'tests/mocks/person.service'
import { MockStatusService } from 'tests/mocks/status.service'
import { getElementFn } from 'tests/utils'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MockActivatedRoute } from 'tests/mocks/activated-route'

@NgModule({
  exports: [
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class PersonTableTestModules {}

export const PersonTableDeclarations = [
  PersonTableComponent,
]

export const PersonTableProviders = [
  { provide: ActivatedRoute, useClass: MockActivatedRoute },
  { provide: StatusService, useClass: MockStatusService },
  { provide: PersonService, useClass: MockPersonService },
  { provide: Router, useValue: { navigate() {} } },
]

describe('PersonTableComponent', () => {
  let component: PersonTableComponent
  let fixture: ComponentFixture<PersonTableComponent>

  function getElement(selector: string): DebugElement {
    return getElementFn(fixture)(selector)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PersonTableTestModules,
      ],
      declarations: PersonTableDeclarations,
      providers: PersonTableProviders
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTableComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
