import { EventEmitter } from '@angular/core'
import { Observable, of } from 'rxjs'
import { GetParam } from '@app/shared/interfaces/get-param'
import { ImageSearchParam } from '@shared/interfaces/image-search-param'
import { ImageResult } from '@app/shared/interfaces/image-result'
import { fakeImage } from './image-result'

export class MockHttpService {
  public readonly onGetStart = new EventEmitter<void>()
  public readonly onGetFinish = new EventEmitter<void>()

  public get(endpoint: string, params: GetParam = {}, emitStatus = true): Observable<any> {
    return of()
  }

  public searchImage(q: string, params: ImageSearchParam): Observable<ImageResult> {
    return of(fakeImage())
  }
}
