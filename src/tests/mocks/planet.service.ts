import { Planet } from '@app/shared/interfaces/planet'
import { Observable, of } from 'rxjs'
import { fakePlanet } from './planet'
import { fakePerson } from './person'

export class MockPlanetService {

  public get(id: string, loadResidents = false): Observable<Planet> {
    const planet = fakePlanet()

    if (loadResidents) {
      planet.people = [
        fakePerson()
      ]
    }

    return of(planet)
  }
}
