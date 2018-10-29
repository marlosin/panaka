import { of } from 'rxjs'

export class MockActivatedRoute {
  queryParams = of({})
  params = of({})
}
