import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators'
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material'
import { PersonService } from '@app/person/services/person.service'
import { PersonDataSource } from './data/person-data-source'
import { FormControl } from '@angular/forms'

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

  constructor(
    private _personService: PersonService,
    private _changeDetector: ChangeDetectorRef,
  ) {
    this.dataSource = new PersonDataSource(this._personService)
  }

  public ngOnInit(): void {
    this._loadPeople()

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
  }

  private _loadPeople(page = 1): void {
    this.dataSource.loadPeople(this.searchFormControl.value, page)
      .subscribe(() => {
        this._changeDetector.detectChanges()
      })
  }
}
