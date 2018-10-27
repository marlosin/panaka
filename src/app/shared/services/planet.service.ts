import { PersonService } from '@app/person/services/person.service'
import { Injectable } from '@angular/core'
import { Observable, forkJoin } from 'rxjs'
import { map, concatAll } from 'rxjs/operators'
import { HttpService } from '@app/shared/services/http.service'
import { Planet } from '@shared/interfaces/planet'
import { Person } from '@shared/interfaces/person'
import { getIdFromUrl } from '../utils/string'

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(
    private _httpService: HttpService,
    private _personService: PersonService,
  ) { }

  public get(id: string, loadResidents = false): Observable<any> {
    if (!loadResidents) {
      return this._httpService.get('/planets/' + id)
        .pipe(
          map((planet) => Object.assign(planet, { id }))
        )
    }

    return Observable.create((observer) => {
      this._httpService.get('/planets/' + id)
        .subscribe((response: Planet) => {
          const residents = response.residents
            .map((url) => getIdFromUrl(url))
            .map((personId) => this._personService.get(personId))

          forkJoin(residents).subscribe((people: Person[]) => {
            const planet = response

            planet.people = people

            observer.next(planet)
            observer.complete()
          })
        })
    })
  }
}
