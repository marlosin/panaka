import { CollectionViewer } from '@angular/cdk/collections'
import { DataSource } from '@angular/cdk/table'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { PersonService } from '@app/person/services/person.service'
import { ListResponse } from '@app/shared/interfaces/list-response';
import { Person } from '@app/shared/interfaces/person'

export class PersonDataSource implements DataSource<Person> {
  private _personSubject = new BehaviorSubject<Person[]>([])
  private _count = 0;

  constructor(
    private _personService: PersonService,
  ) {}

  public connect(collectionViewer: CollectionViewer): Observable<Person[]> {
    return this._personSubject.asObservable()
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this._personSubject.complete()
  }

  public loadPeople(filter = '', page = 1): Observable<ListResponse<Person>> {
      const params = {
        filter,
        page,
      }

    return this._personService.list(params)
      .pipe(
        catchError(() => of([])),
        tap((response: ListResponse<Person>) => {
          this._personSubject.next(response.results)
          this._count = response.count
        }),
      )
  }

  public get count(): number {
    return this._count
  }
}
