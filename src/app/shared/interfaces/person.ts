import { PersonData } from '@shared/interfaces/person-data';
export class Person {
  id: string
  name: string
  gender: string
  birthYear: string
  filmUrls: string[]
  planetUrl: string
  planetName?: string
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
    const [id] = /[0-9]+/.exec(url)

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
    this.planetName = person.planetName || null
    this.films = person.films || []
  }
}
