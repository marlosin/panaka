import { AppComponent } from '@app/app.component'
import { StatusService } from './shared/services/status.service'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatButtonModule, MatToolbarModule, MatProgressBarModule } from '@angular/material'
import { MockStatusService } from 'tests/mocks/status.service'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { getElementFn } from 'tests/utils'
import { Router } from '@angular/router'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let router: Router

  function getElement(selector: string): DebugElement {
    return getElementFn(fixture)(selector)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressBarModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: StatusService, useClass: MockStatusService },
        { provide: Router, useValue: { navigate() {} } },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    router = fixture.debugElement.injector.get(Router)
    component = fixture.debugElement.componentInstance
  })

  it('should create the app', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it(`should render title 'Panaka - a Star Wars consumer API'`, () => {
    fixture.detectChanges()
    expect(getElement('.title-row').nativeElement.textContent)
      .toContain('Panaka - a Star Wars consumer API')
  })

  it(`should go to people page when clicking menu button`, () => {
    fixture.detectChanges()
    spyOn(router, 'navigate').and.callFake(() => {})

    getElement('.button-go-people').triggerEventHandler('click', new Event('click'))

    expect(router.navigate).toHaveBeenCalledWith(['people'])
  })

})
