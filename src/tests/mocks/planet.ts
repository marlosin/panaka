import { Planet } from '@shared/interfaces/planet'

export function fakePlanet(): Planet {
  return {
    id: '1',
    name: 'jakku',
    residents: [],
    people: [],
  }
}
