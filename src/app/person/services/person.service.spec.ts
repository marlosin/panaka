import { HttpService } from '@app/shared/services/http.service'
import { TestBed } from '@angular/core/testing'

import { PersonService } from './person.service'
import { MockHttpService } from 'tests/mocks/http.service'

describe('PersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpService, useClass: MockHttpService },
    ]
  }))

  it('should be created', () => {
    const service: PersonService = TestBed.get(PersonService)
    expect(service).toBeTruthy()
  })
})
