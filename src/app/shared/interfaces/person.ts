import { Planet } from './planet'
import { getIdFromUrl } from '@app/shared/utils/string'
import { PersonData } from '@shared/interfaces/person-data'
export class Person {
  id: string
  name: string
  gender: string
  birthYear: string
  filmUrls: string[]
  planetUrl: string
  imageUrl?: string
  avatarUrl?: string
  planet?: Planet
  films?: string[]

  public static create(personData: PersonData): Person {
    const {
      name,
      gender,
      birth_year,
      url,
      films: filmUrls,
      homeworld: planetUrl,
    } = personData
    const id = getIdFromUrl(url)

    return new Person({
      id,
      name,
      gender,
      filmUrls,
      planetUrl,
      birthYear: birth_year,
    })
  }

  constructor(person: Person) {
    this.id = person.id
    this.name = person.name
    this.gender = person.gender
    this.birthYear = person.birthYear
    this.filmUrls = person.filmUrls
    this.planetUrl = person.planetUrl
    this.planet = person.planet || null
    this.films = person.films || []
  }
}
