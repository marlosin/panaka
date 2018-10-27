import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PersonService } from '@person/services/person.service'
import { PlanetService } from '@shared/services/planet.service'
import { Planet } from '@app/shared/interfaces/planet'

@Component({
  selector: 'panaka-planet-resident-list',
  templateUrl: './planet-resident-list.component.html',
  styleUrls: ['./planet-resident-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetResidentListComponent implements OnInit {
  private _planet: Planet

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _personService: PersonService,
    private _planetService: PlanetService,
    private _changeDetector: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this._loadPlanet(params.id)
    })
  }

  public get planet(): Planet {
    return this._planet
  }

  private _loadPlanet(id: string) {
    this._planetService.get(id, true)
      .subscribe((planet) => {
        this._planet = planet
        this._changeDetector.detectChanges()
      })
  }
}
