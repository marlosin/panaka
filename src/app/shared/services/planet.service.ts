import { Injectable } from '@angular/core'
import { forkJoin, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { PersonService } from '@app/person/services/person.service'
import { HttpService } from '@app/shared/services/http.service'
import { Person } from '@shared/interfaces/person'
import { Planet } from '@shared/interfaces/planet'
import { getIdFromUrl } from '@shared/utils/string'

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
            .map((personId) => this._personService.get(personId, false))

          this._httpService.onGetStart.emit()
          forkJoin(residents)
          .pipe(
            tap(() => {
              this._httpService.onGetFinish.emit()
            })
          )
          .subscribe((people: Person[]) => {
              const planet = response

              planet.people = people

              observer.next(planet)
              observer.complete()
            })
        })
    })
  }
}
