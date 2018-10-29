import { PlanetService } from '@shared/services/planet.service'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { tap } from 'rxjs/operators'

import { PersonService } from '@person/services/person.service'
import { ImageSearchParam } from '@shared/interfaces/image-search-param'
import { Person } from '@shared/interfaces/person'
import { getIdFromUrl } from '@app/shared/utils/string'

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
    private _planetService: PlanetService,
    private _changeDetector: ChangeDetectorRef,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this._loadPerson(params.id)
    })
  }

  public get person(): Person {
    return this._person
  }

  public goToPlanet(planetId: string): void {
    this._router.navigate(['planets', planetId])
  }

  private _loadPerson(id: string) {
    this._personService.get(id)
      .pipe(
        tap((person) => {
          this._loadFilmNames(person)
          this._loadPlanet(person)
          this._loadImages(person)
        })
      )
      .subscribe((person) => {
        this._person = person
        this._changeDetector.detectChanges()
      })
  }

  private _loadFilmNames(person: Person) {
    this._personService.getFilmNames(person.filmUrls).subscribe((filmNames) => {
      person.films = filmNames
      this._changeDetector.detectChanges()
    })
  }

  private _loadImages(person: Person) {
    const avatarParams: ImageSearchParam = { imageSize: 'small', imageType: 'face' }

    this._personService.getImage(person.name, avatarParams)
      .subscribe((result) => {
        person.avatarUrl = result.link
        this._changeDetector.detectChanges()
      })

    const imgParams: ImageSearchParam = { imageSize: 'large', imageType: 'photo' }

    this._personService.getImage(person.name, imgParams)
      .subscribe((result) => {
        person.imageUrl = result.link
        this._changeDetector.detectChanges()
      })
  }

  private _loadPlanet(person: Person) {
    const id = getIdFromUrl(person.planetUrl)
    this._planetService.get(id).subscribe((planet) => {
      person.planet = planet
      this._changeDetector.detectChanges()
    })
  }
}
