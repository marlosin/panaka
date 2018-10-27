import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators'
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core'
import { MatPaginator, PageEvent, MatSort, Sort } from '@angular/material'
import { FormControl } from '@angular/forms'
import { PersonService } from '@app/person/services/person.service'
import { PersonDataSource } from './data/person-data-source'

@Component({
  selector: 'panaka-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonTableComponent implements OnInit, AfterViewInit {
  public readonly dataSource: PersonDataSource
  public readonly displayedColumns = ['name', 'gender', 'birthYear']
  public readonly searchFormControl = new FormControl()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private _personService: PersonService,
    private _changeDetector: ChangeDetectorRef,
  ) {
    this.dataSource = new PersonDataSource(this._personService)
  }

  public ngOnInit(): void {
    this._loadPeople()

    this.sort.sortChange.subscribe((direction) => console.log);

    this.searchFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
      ).subscribe((value) => {
        this._loadPeople(value)
      })
  }

  public ngAfterViewInit(): void {
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

  private _loadPeople(page = 1): void {
    this.dataSource.loadPeople(this.searchFormControl.value, page)
      .subscribe(() => {
        this._changeDetector.detectChanges()
      })
  }
}
