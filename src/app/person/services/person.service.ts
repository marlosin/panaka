import { getIdFromUrl } from '@app/shared/utils/string'
import { ImageSearchParam } from '@shared/interfaces/image-search-param'
import { Injectable } from '@angular/core'
import { Observable, forkJoin, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpService } from '@app/shared/services/http.service'
import { ListResponse } from '@app/shared/interfaces/list-response'
import { Person } from '@app/shared/interfaces/person'
import { PersonData } from '@shared/interfaces/person-data'
import { GetParam } from '@app/shared/interfaces/get-param'
import { ImageResult } from '@app/shared/interfaces/image-result'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private _httpService: HttpService,
  ) { }

  public list(params: GetParam = {}): Observable<ListResponse<Person>> {
    return this._httpService.get('/people', params)
      .pipe(
        catchError(() => of([])),
        map((response: ListResponse<PersonData>) => {
          const { results, ...rest } = response

          const mappedPerson: Person[] = results.map(Person.create)

          return Object.assign(rest, {
            results: mappedPerson,
          })
        })
      )
  }

  public get(id: string): Observable<Person> {
    return this._httpService.get('/people/' + id)
      .pipe(
        map(Person.create)
      )
  }

  public getFilmNames(filmUrls: string[]): Observable<string[]> {
    const byFilmObservable = (id: string) => {
      return this._httpService.get('/films/' + id)
        .pipe(
          map((response: { title: string }) => response.title)
        )
    }

    const observables = filmUrls
      .map((url) => getIdFromUrl(url))
      .map(byFilmObservable)

    return forkJoin(observables)
  }

  public getImage(name: string, params: ImageSearchParam): Observable<ImageResult> {
    return this._httpService.searchImage(name, params)
  }
}
