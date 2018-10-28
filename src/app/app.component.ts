import { StatusService } from './shared/services/status.service'
import { Router } from '@angular/router'
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'panaka-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public readonly title = 'Panaka - a Star Wars consumer API'
  public isLoading = true

  constructor(
    private _router: Router,
    private _statusService: StatusService,
    private _changeDetector: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this._statusService.isLoading.subscribe(() => {
      this.isLoading = true
      this._changeDetector.detectChanges()
    })

    this._statusService.finishedLoading.subscribe(() => {
      this.isLoading = false
      this._changeDetector.detectChanges()
    })
  }

  public goToPeople(): void {
    this._router.navigate(['people'])
  }
}
