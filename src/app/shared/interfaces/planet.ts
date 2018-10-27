import { Person } from './person'

export interface Planet {
  id: string
  name: string
  residents: string[]
  people?: Person[]
}
