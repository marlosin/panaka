import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material'
import { Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'

import { PersonService } from '@app/person/services/person.service'
import { Person } from '@shared/interfaces/person'
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

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private _personService: PersonService,
    private _changeDetector: ChangeDetectorRef,
    private _router: Router,
  ) {
    this.dataSource = new PersonDataSource(this._personService)
  }

  public ngOnInit(): void {
    this._loadPeople()

    if (this.people) { return }

    this.searchFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
      ).subscribe((value) => {
        this._loadPeople(value)
      })
  }

  public ngAfterViewInit(): void {
    if (this.people) { return }

    this.paginator.page
      .pipe(
        tap((pageEvent: PageEvent) => {
          this._loadPeople(pageEvent.pageIndex + 1)
        })
      ).subscribe()

    this.sort.sortChange.subscribe((sort: Sort) => {
      this.dataSource.sort(sort)
      this._changeDetector.detectChanges()
    })
  }

  public goToDetails(row: Person) {
    this._router.navigate(['people', row.id])
  }

  private _loadPeople(page = 1): void {
    if (this.people) {
      this.dataSource.addPeople(this.people)
      this._changeDetector.detectChanges()
      return
    }

    this.dataSource.loadPeople(this.searchFormControl.value, page)
      .subscribe(() => {
        this._changeDetector.detectChanges()
      })
  }
}
