import { finalize, tap } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@shared/interfaces/person';
import { PersonService } from '@person/services/person.service';

@Component({
  selector: 'panaka-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailComponent implements OnInit {
  private _person: Person

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _personService: PersonService,
    private _changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._loadPerson(params.id)
    })
  }

  public get person(): Person {
    return this._person
  }

  private _loadPerson(id: number) {
    this._personService.get(id)
      .pipe(
        tap((person) => {
          this._loadFilmNames(person)
          this._loadPlanet(person)
        })
      )
      .subscribe(person => {
        this._person = person
        this._changeDetector.detectChanges()
      })
  }

  private _loadFilmNames(person: Person) {
    this._personService.getFilmNames(person.filmUrls).subscribe((filmNames) => {
      this._person.films = filmNames
      this._changeDetector.detectChanges()
    })
  }
  private _loadPlanet(person: Person) {
    // TODO: load planet
  }
}
