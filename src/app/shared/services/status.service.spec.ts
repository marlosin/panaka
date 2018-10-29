import { MockHttpService } from 'tests/mocks/http.service'
import { HttpService } from '@app/shared/services/http.service'
import { TestBed } from '@angular/core/testing'

import { StatusService } from './status.service'

describe('StatusService', () => {
  let service: StatusService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useClass: MockHttpService },
      ]
    })
    service = TestBed.get(StatusService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
