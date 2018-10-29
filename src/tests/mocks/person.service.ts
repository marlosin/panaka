import { ImageResult } from '@app/shared/interfaces/image-result'
import { ImageSearchParam } from '@shared/interfaces/image-search-param'
import { ListResponse } from '@app/shared/interfaces/list-response'
import { Person } from '@app/shared/interfaces/person'
import { Observable, of } from 'rxjs'
import { GetParam } from '@app/shared/interfaces/get-param'
import { fakePerson } from './person'
import { fakeImage } from './image-result'

const person = fakePerson()

export class MockPersonService {
  public list(params: GetParam = {}): Observable<ListResponse<Person>> {
    return of({
      count: 1,
      next: null,
      previous: null,
      results: [person],
    })
  }

  public get(id: string, emitStatus = true): Observable<Person> {
    return of(person)
  }

  public getFilmNames(filmUrls: string[]): Observable<string[]> {
    return of([
      'A New Hope',
      'The Empire Strikes Back',
    ])
  }

  public getImage(name: string, params: ImageSearchParam): Observable<ImageResult> {
    return of(fakeImage())
  }
}
