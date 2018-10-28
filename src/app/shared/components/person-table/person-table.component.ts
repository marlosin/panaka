import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'

import { PersonService } from '@app/person/services/person.service'
import { Person } from '@shared/interfaces/person'
import { StatusService } from '@app/shared/services/status.service'
import { PersonDataSource } from './data/person-data-source'

@Component({
  selector: 'panaka-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonTableComponent implements OnInit, AfterViewInit {
  @Input() people: Person[]
  public readonly dataSource: PersonDataSource
  public readonly displayedColumns = ['name', 'gender', 'birthYear']
  public readonly searchFormControl = new FormControl()
  public isLoading: boolean

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _personService: PersonService,
    private _statusService: StatusService,
    private _changeDetector: ChangeDetectorRef,
    private _router: Router,
  ) {
    this.dataSource = new PersonDataSource(this._personService)
  }

  public ngOnInit(): void {
    if (this.people) {
      this._loadPeople()
      return
    }

    this._listenQueryParams()
    this._listenFilterChanges()
    this._listenStatus()
  }

  public ngAfterViewInit(): void {
    if (this.people) { return }

    this._listenPaginationChanges()
    this._listenSortChanges()
  }

  public goToDetails(row: Person) {
    this._router.navigate(['people', row.id])
  }

  public get hasContent(): boolean {
    return !this.isLoading && Boolean(this.dataSource.count)
  }

  public get hasNoContent(): boolean {
    return this.isLoading === false && !Boolean(this.dataSource.count)
  }

  private _loadPeople(page = 1, filter?: string): void {
    if (this.people) {
      this.dataSource.addPeople(this.people, this.people.length)
      this._changeDetector.detectChanges()
      return
    }

    const _filter = !filter
      ? this.searchFormControl.value
      : filter

    this.searchFormControl.patchValue(_filter, { emitEvent: false })

    this.dataSource.loadPeople(_filter, page)
      .subscribe(() => {
        this._changeDetector.detectChanges()
      })
  }

  private _listenPaginationChanges(): void {
    this.paginator.page
    .pipe(
      tap((pageEvent: PageEvent) => {
        this._navigate({ page: pageEvent.pageIndex + 1 })
      })
    ).subscribe()
  }

  private _listenSortChanges(): void {
    this.sort.sortChange.subscribe((sort: Sort) => {
      this.dataSource.sort(sort)
      this._changeDetector.detectChanges()
    })
  }

  private _listenFilterChanges(): void {
    this.searchFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
      ).subscribe((filter) => {
        this._navigate({ filter })
      })
  }

  private _listenQueryParams(): void {
    this._activatedRoute.queryParams
      .subscribe((queryParams) => {
        console.log('entrou')
        this._loadPeople(queryParams.page, queryParams.filter)
      })
  }

  private _navigate(queryParams: Params): void {
    console.log(queryParams)

    if (queryParams.filter === '') {
      delete queryParams.filter

      if (!queryParams.page) {
        this._router.navigate(['/people'])
        return
      }
    }

    this._router.navigate(['/people'], {
      queryParams,
      queryParamsHandling: 'merge'
    })
  }

  private _listenStatus(): void {
    this._statusService.isLoading.subscribe(() => {
      this.isLoading = true
      this._changeDetector.detectChanges()
    })

    this._statusService.finishedLoading.subscribe(() => {
      this.isLoading = false
      this._changeDetector.detectChanges()
    })
  }
}
