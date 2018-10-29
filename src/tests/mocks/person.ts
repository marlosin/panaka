import { Person } from '@app/shared/interfaces/person'
import { fakePlanet } from './planet'

export function fakePerson(person?: Person): Person {
  const newPerson = new Person({
    id: '1',
    name: 'Luke Skywalker',
    gender: 'male',
    birthYear: '19BBY',
    filmUrls: [
      '/films/1',
      '/films/2'
    ],
    planetUrl: '/planets/1',
    imageUrl: '',
    avatarUrl: '',
    planet: fakePlanet(),
  })

  return person ? Object.assign(newPerson, person) : newPerson
}
