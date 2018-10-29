import { MockHttpService } from 'tests/mocks/http.service'
import { HttpService } from '@app/shared/services/http.service'
import { TestBed } from '@angular/core/testing'

import { PlanetService } from './planet.service'

describe('PlanetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpService, useClass: MockHttpService },
    ]
  }))

  it('should be created', () => {
    const service: PlanetService = TestBed.get(PlanetService)
    expect(service).toBeTruthy()
  })
})
