import { PersonData } from './../../shared/interfaces/person-data'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpService } from '@app/shared/services/http.service'
import { ListResponse } from '@app/shared/interfaces/list-response'
import { Person } from '@app/shared/interfaces/person'
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

          const mappedPerson: Person[] = results.map(personData => {
            const { name, gender, birth_year } = personData
            return {
              name,
              gender,
              birthYear: birth_year,
            }
          })

          return Object.assign(rest, {
            results: mappedPerson,
          })
        })
      )
  }
}
