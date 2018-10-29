import { Observable, of } from 'rxjs'
import { TestBed } from '@angular/core/testing'

import { HttpService } from './http.service'
import { HttpClient } from '@angular/common/http'

class MockHttpClient {
  public get(url: string, options: any): Observable<any> {
    return of()
  }
}

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: MockHttpClient },
    ]
  }))

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService)
    expect(service).toBeTruthy()
  })
})
