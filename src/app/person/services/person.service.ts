import { Injectable } from '@angular/core'
import { Observable, forkJoin, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpService } from '@app/shared/services/http.service'
import { ListResponse } from '@app/shared/interfaces/list-response'
import { Person } from '@app/shared/interfaces/person'
import { PersonData } from '@shared/interfaces/person-data'
import { GetParam } from '@app/shared/interfaces/get-param'

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
        map((response: ListResponse<PersonData>) => {
          const { results, ...rest } = response

          const mappedPerson: Person[] = results.map(Person.create)

          return Object.assign(rest, {
            results: mappedPerson,
          })
        })
      )
  }

  public get(id: number): Observable<Person> {
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
      .map((url) => /[0-9]+/.exec(url)[0])
      .map(byFilmObservable)

    return forkJoin(observables)
  }
}
